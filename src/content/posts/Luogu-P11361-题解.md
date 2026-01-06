---
title: Luogu-P11361-题解
date: "2025-02-21"
description: 据题意，考虑贪心做法，即每一位尽可能匹配上，这个策略显然正确，因为对于每一位来说，当前位匹配至多导致后面的一对无法匹配。所以我们可以将字符串按无法交换的字符为界，分割为多个块，分别对于每一块进行操作。一种做法为，先预处理出每一位字符所在的块的编号，并预处理出每一个块中
tags: ['题解', 'Luogu']
draft: false
---
# P11361 [NOIP2024] 编辑字符串 题解
## 题意分析
根据题意，考虑贪心做法，即每一位尽可能匹配上，这个策略显然正确，因为对于每一位来说，当前位匹配至多导致后面的一对无法匹配。

所以我们可以将字符串按无法交换的字符为界，分割为多个块，分别对于每一块进行操作。

一种做法为，先预处理出每一位字符所在的块的编号，并预处理出每一个块中，`1`和`0`的个数。然后遍历字符串，如果当前字符所在的两个块中，有相同的字符，则将两个块中对应字符的个数减一；如果没有，则将当前位的两个字符减去。过程中统计答案即可。
## Code
```cpp
// #pragma GCC optimize(1, 2, 3, "Ofast", "inline")
#include <bits/stdc++.h>
using namespace std;
#define ll long long
#define int ll
#define ONLINE_JUDGE
#define MULTI_CASES
#define endl '\n'
const int MaxN = 2e5 + 100;
const int INF = 1e9;
const int mod = 212370440130137957ll;
int T = 1, N, M;
// int a[MaxN];
int cnt1[MaxN], cnt2[MaxN];
pair<int, int> q1[MaxN], q2[MaxN];
inline void Solve()
{
    cin >> N;
    string s1, s2, a, b;
    memset(cnt1, 0, sizeof cnt1);
    memset(cnt2, 0, sizeof cnt2);
    memset(q1, 0, sizeof q1);
    memset(q2, 0, sizeof q2);
    int pos = 1;
    cnt1[0] = 1;
    cin >> s1 >> s2 >> a >> b;
    for (int i = 1; i < N; i++)
    {
        if (a[i] == a[i - 1] && a[i] == '1')
        {
            cnt1[i] = pos;
        }
        else
        {
            pos++;
            cnt1[i] = pos;
        }
        if (s1[i] == '1')
        {
            q1[cnt1[i]].first++;
        }
        else
        {
            q1[cnt1[i]].second++;
        }
    }
    pos = 1;
    cnt2[0] = 1;
    for (int i = 1; i < N; i++)
    {
        if (b[i] == b[i - 1] && b[i] == '1')
        {
            cnt2[i] = pos;
        }
        else
        {
            pos++;
            cnt2[i] = pos;
        }
        if (s2[i] == '1')
        {
            q2[cnt2[i]].first++;
        }
        else
        {
            q2[cnt2[i]].second++;
        }
    }
    if (s1[0] == '1')
    {
        q1[cnt1[0]].first++;
    }
    else
    {
        q1[cnt1[0]].second++;
    }
    if (s2[0] == '1')
    {
        q2[cnt2[0]].first++;
    }
    else
    {
        q2[cnt2[0]].second++;
    }
    int sum = 0;
    for (int i = 0; i < N; i++)
    {
        // cerr << cnt1[i] << " " << cnt2[i] << endl;

        // cerr << q1[cnt1[i]].first << " " << q2[cnt2[i]].first << " ";
        // cerr << q1[cnt1[i]].second << " " << q2[cnt2[i]].second << endl;

        if (q1[cnt1[i]].first > 0 && q2[cnt2[i]].first > 0)
        {
            q1[cnt1[i]].first--;
            q2[cnt2[i]].first--;
            sum++;
            continue;
        }
        if (q1[cnt1[i]].second > 0 && q2[cnt2[i]].second > 0)
        {
            q1[cnt1[i]].second--;
            q2[cnt2[i]].second--;
            sum++;
            continue;
        }
        if (q1[cnt1[i]].first)
        {
            q1[cnt1[i]].first--;
            q2[cnt2[i]].second--;
            continue;
        }
        if (q1[cnt1[i]].second)
        {
            q1[cnt1[i]].second--;
            q2[cnt2[i]].first--;
        }
    }
    cout << sum << endl;
}
signed main()
{
#ifndef ONLINE_JUDGE
    freopen(".in", "r", stdin);
    freopen(".out", "w", stdout);
#endif
    ios::sync_with_stdio(0);
    cin.tie(0), cout.tie(0);

#ifdef MULTI_CASES
    cin >> T;
    while (T--)
#endif
        Solve();
    // fclose(stdin);
    // fclose(stdout);
    return 0;
}
```