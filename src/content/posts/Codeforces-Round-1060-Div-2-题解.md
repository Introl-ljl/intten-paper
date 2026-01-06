---
title: Codeforces Round 1060 (Div. 2）题解
date: "2025-10-23"
description: Codeforces Round 1060 (Div. 2) A-E题解。
tags: ["题解", "Codeforces", "算法"]
draft: false
---
# A. Notelock
给定一个长度为 $n$ 的二进制字符串 $s$ 和一个正整数 $k$，进行以下操作：

-  首先选择一些位置进行保护
- 然后对于 $s_i$，如果满足以下条件，可以将其修改为 $0$。
	- $s_i=1$，
	- $s_i$ 未受保护。
	- 当前位置的前 $k-1$ 个元素不包含 $1$。

要求找到最少的保护位置数使得 $s$ 不被修改。
## 题目解析
贪心即可。
## Code
```cpp
#include <bits/stdc++.h>
using namespace std;
#define MULTI_CASES
#define ll long long
#define int ll
#define endl '\n'
#define vi vector<int>
#define PII pair<int, int>
const int MaxN = 2e5 + 100;
const int INF = 1e9;
const int mod = 1e9 + 7;
int T = 1, N, M;
int a[MaxN];
inline void Solve()
{
    cin >> N >> M;
    string s;
    cin >> s;
    int pos = -1;
    int sum = 0;
    for (int i = 0; i < N; i++)
    {
        if (s[i] == '1')
        {
            if (i > pos)
            {

                sum++;
            }
            pos = i + M - 1;
        }
    }
    cout << sum << endl;
}
signed main()
{
#ifdef NOI_IO
    freopen(".in", "r", stdin);
    freopen(".out", "w", stdout);
#endif
    ios::sync_with_stdio(0);
    cin.tie(nullptr), cout.tie(nullptr);
#ifdef MULTI_CASES
    cin >> T;
    while (T--)
#endif
        Solve();
    return 0;
}
```
# B. Make it Zigzag
给定一个长度为 $n$ 的数组 $a$，可以执行两种操作：
- 操作 $1$：选择一个位置 $i$，使得 $a_i:=\max(a1,...,a_i)$。
- 操作 $2$：选择一个位置 $i$，使得 $a_i:=a_i-1$。
要求将此数组转化为符合 $a_1<a_2>a_3<a_4>a_5...$ 的格式。同时要求最小化操作 $2$ 的次数。
## 题目解析
首先，由于操作 $1$ 不会对答案产生贡献，且操作 $1$ 对于偶数位是有利的。

因此我们可以先对所有的偶数位执行操作 $1$，这样可以保证对于所有偶数位的 $a_i$ 一定大于等于前一位 $a_{i-1}$。

接下来考虑操作 $2$，对于每个奇数位上的 $a_i$，一定满足 $a_i\leq a_{i+1}$。那么只需要考虑特殊的 $a_i=a_{i+1}$ 执行一次操作 $2$ 即可。

而对于当前位的前一位而言，由于不存在任何能够使 $a_{i-1}$ 的值增加的方法，所以其一定会产生 $a_i-a_{i-1}+1$ 的贡献。

综合而言，对于奇数位的 $a_i$，产生的贡献是 $\max(0,a_i-\min(a_{i-1},a_{i+1})+1)$。
## Code
赛时代码，思路可能差异。
```cpp
#include <bits/stdc++.h>
using namespace std;
#define MULTI_CASES
#define ll long long
#define int ll
#define endl '\n'
#define vi vector<int>
#define PII pair<int, int>
const int MaxN = 2e5 + 100;
const int INF = 1e9;
const int mod = 1e9 + 7;
int T = 1, N, M;
int a[MaxN];
inline void Solve()
{
    cin >> N;
    for (int i = 1; i <= N; i++)
    {
        cin >> a[i];
    }
    int maxn = 0;
    int ans = 0;
    for (int i = 1; i <= N; i++)
    {
        // cerr << maxn << " ";
        maxn = max(maxn, a[i]);
        if (i % 2 == 0)
        {
            a[i] = maxn;
            if (!(a[i] > a[i - 1]))
            {
                // cerr << i << " ";
                ans++;
            }
        }
        else
        {
            if (a[i] >= a[i - 1] && i != 1)
            {
                // cerr<<i<<" "<<a[i]-a[i-1]+1<<"  ";
                ans += a[i] - a[i - 1] + 1;
                a[i] = a[i - 1] - 1;
            }
        }
    }
    // cerr << endl;
    cout << ans << endl;
}
signed main()
{
#ifdef NOI_IO
    freopen(".in", "r", stdin);
    freopen(".out", "w", stdout);
#endif
    ios::sync_with_stdio(0);
    cin.tie(nullptr), cout.tie(nullptr);
#ifdef MULTI_CASES
    cin >> T;
    while (T--)
#endif
        Solve();
    return 0;
}
```
# C1+C2. No Cost Too Great
给定长度为 $n$ 的两个数组 $a,b$。可以执行以下操作任意次：
- 选择一个 $a_i:=a_i+1$，操作代价为 $b_i$。

要求在最小的代价下实现存在一组 $(i,j)$ 满足 $\gcd(a_i,a_j)>1$。

> C1要求 $b_i=1$，C2要求 $1\le b_i\le 10^9$
## 题目分析
**首先考虑在C1的条件限制下的做法。**

由于 $b_i=1$，所以我们可以忽略代价，只需要考虑最小的操作次数。

不难发现，只要存在两个数 $a_i,a_j$ 都是偶数，直接就可以满足条件。那么显然，最坏的情况下也可以通过至多 $2$ 次操作实现满足要求。

那么我们只需要考虑答案为 $0,1$ 的两种情况即可。

首先考虑答案为 $0$ 的情况，我们只需要确定是否有两个数的质因数相同即可。

同理，对于答案为 $1$ 的情况，我们只需要确定是否存在 $a_i,a_j+1$ 的质因数相同即可。

那么就很简单了，我们只需要通过埃氏筛预处理出所有数的质因数并使用``std::map<int,int>`` 统计答案即可。

**考虑在C2的条件限制下的做法**

类比C1的做法，可以得出几个性质。

首先，我们总能以不超过 $b_i+b_j$ 的代价，使得两个元素 $a_i,a_j$ 均变为 $2$ 的倍数。所以，根据这一性质，可以发现对于多个元素执行多次操作一定不会比修改两数变为 $2$ 的倍数更优。

那么，本题就只有两种情况需要考虑了。

第一种情况，对于某一对 $(i,j)$，分别对 $a_i,a_j$ 执行 $0$ 或 $1$ 次操作。这一部分很简单，类比C1的做法即可。对于每次符合条件的情况维护一个最小值即可。

第二种情况，对于某一个位置 $i$，只对其执行多次操作。这一部分比较难处理，按照暴力的想法来看，我们需要对于每个 $a_i$ 遍历执行一次。但实际上只需要处理 $b_{min}$ 所对应的数即可。

使用反证法可以证明，对于任意不为 $b_{min}$ 的 $b_i$，对其执行 $k$ 次操作。那么其产生的贡献就是 $k\cdot b_i$。但从刚才提到的性质可知，会有另外一种方案 $b_{min}+b_i$，且 $b_{min}+b_i<k\cdot b_i$。所以这些方案是没有必要的。

那么怎么快速处理对 $b_{min}$ 多次操作的情况呢？我们可以转化思路，遍历其他元素的质因数，并求解使得 $b_{min}$ 对应的 $a_i$ 可被整除的最小次数。

## Code
```cpp
//C2
#include <bits/stdc++.h>
using namespace std;
#define MULTI_CASES
#define ll long long
#define int ll
#define endl '\n'
#define vi vector<int>
#define PII pair<int, int>
const int MaxN = 5e5 + 100;
const int INF = 1e9;
const int mod = 1e9 + 7;
int T = 1, N, M;
// int a[MaxN], b[MaxN];
int pf[MaxN];
void init()
{
    for (int i = 2; i <= MaxN - 2; i++)
    {
        pf[i] = i;
    }
    for (int i = 2; i * i <= MaxN - 2; i++)
    {
        if (pf[i] == i)
        {
            for (int j = i * i; j <= MaxN - 2; j += i)
            {
                if (pf[j] == j)
                {
                    pf[j] = i;
                }
            }
        }
    }
}
// int c[MaxN];
struct node
{
    int a, b;
} a[MaxN];
bool cmp(node a, node b)
{
    return a.b < b.b;
}
inline void Solve()
{
    cin >> N;
    int maxn = 0;
    for (int i = 1; i <= N; i++)
    {
        cin >> a[i].a;
        maxn = max(a[i].a, maxn);
    }
    for (int i = 1; i <= N; i++)
    {
        cin >> a[i].b;
    }
    sort(a + 1, a + N + 1, cmp);
    map<int, int> mp, mp2;
    for (int i = 1; i <= N; i++)
    {
        int x = a[i].a;
        while (x != 1)
        {
            int t = pf[x];
            if (mp[t])
            {
                cout << 0 << endl;
                return;
            }
            mp[t]++;
            if (i != 1)
            {
                mp2[t]++;
            }
            while (x % t == 0)
            {
                x /= t;
            }
        }
    }
    int cnt = -1;
    int ans = a[1].b + a[2].b;
    for (auto y : mp2)
    {
        int r = a[1].a % y.first;
        if (r == 0)
            continue;
        int cnt = y.first - r;
        ans = min(ans, cnt * a[1].b);
    }
    for (int i = 1; i <= N; i++)
    {
        int x = a[i].a + 1;
        while (x != 1)
        {
            int t = pf[x];
            if (mp[t])
            {
                ans = min(ans, a[i].b);
                // cout << 1 << endl;
                // return;
            }
            while (x % t == 0)
            {
                x /= t;
            }
        }
    }

    cout << ans << endl;
}
signed main()
{
    init();
#ifdef NOI_IO
    freopen(".in", "r", stdin);
    freopen(".out", "w", stdout);
#endif
    ios::sync_with_stdio(0);
    cin.tie(nullptr), cout.tie(nullptr);
#ifdef MULTI_CASES
    cin >> T;
    while (T--)
#endif
        Solve();
    return 0;
}
```