---
title: Codeforces Round 1003 (Div. 4）题解
date: "2025-02-15"
description: Codeforces Round 1003 (Div. 4)题解 A-C2
tags: ['题解', 'Codeforces']
draft: false
---
# Codeforces Round 1003 (Div. 4)题解
## A
字符串水题
### Code
```cpp
#pragma GCC optimize(1, 2, 3, "Ofast", "inline")
#include <bits/stdc++.h>
using namespace std;
#define ll long long
#define int ll
#define ONLINE_JUDGE
#define MULTI_CASES
#define endl '\n'
const int MaxN = 2e5+100;
const int INF = 1e9;
const int mod=212370440130137957ll;
int T=1, N, M;
int a[MaxN];
inline void Solve()
{
	string s;
    cin>>s;
    s.erase(s.size()-2,2);
    cout<<s<<"i"<<endl;
}
signed main()
{
#ifndef ONLINE_JUDGE
    freopen(".in", "r", stdin);
    freopen(".out", "w", stdout);
#endif
    ios::sync_with_stdio(0);
    cin.tie(0),cout.tie(0);

#ifdef MULTI_CASES
    cin >> T;
    while (T--)
#endif
       Solve();
    //fclose(stdin);
    //fclose(stdout);
    return 0;
}
```
## B
### 题意简述
给定一个字符串 $s$，每次操作，可以选择一个索引 $i（1\le i\le \lvert s \rvert-1）$，且 $s_i=s_{i+1}$，然后将这两个字符更改为任意一个字母。求多次操作后可以达到的最小长度。
### 题目分析
不难发现，只要字符串中存在 $s_i=s_{i+1}$，就可以重复删除字符并更改为相邻字符。最后的长度一定为 $1$。
### Code
```cpp
#pragma GCC optimize(1, 2, 3, "Ofast", "inline")
#include <bits/stdc++.h>
using namespace std;
#define ll long long
#define int ll
#define ONLINE_JUDGE
#define MULTI_CASES
#define endl '\n'
const int MaxN = 2e5+100;
const int INF = 1e9;
const int mod=212370440130137957ll;
int T=1, N, M;
int a[MaxN];
inline void Solve()
{
	string s;
    cin>>s;
    for(int i=0;i<s.size()-1;i++){
        if(s[i]==s[i+1]){
            cout<<1<<endl;
            return;
        }
    }
    cout<<s.size()<<endl;
}
signed main()
{
#ifndef ONLINE_JUDGE
    freopen(".in", "r", stdin);
    freopen(".out", "w", stdout);
#endif
    ios::sync_with_stdio(0);
    cin.tie(0),cout.tie(0);

#ifdef MULTI_CASES
    cin >> T;
    while (T--)
#endif
       Solve();
    //fclose(stdin);
    //fclose(stdout);
    return 0;
}
```
## C1/C2
### 题意简述
给定长度分别为 $n,m$ 的数组 $a,b$，对于 $a$ 中的每个元素，最多可以执行一次操作。

- 选择一个整数 $j（1\le j\le m）$，使得 $a_i:=b_j-a_i$。

求是否在若干次操作后，数组 $a$ 可以按非递减顺序排序。

C1要求 $m=1$，C2要求 $1\le m \le 2\times 10^5$。
### 题目分析
#### C1
考虑贪心，对于每一位数字，要尽可能保证前一个数小于等于后一个数，那么对于每一个数都要在符合条件的情况下尽可能小，而因为 $m=1$，所以对于每一位数 $a_i$ 将其与 $b_0-a_i$ 比大小，在保证比上一个数大的条件下，选择更小的那个即可。如果当前数无论如何操作都无法满足，则说明不可以实现。
#### C2
在C1的基础上，依然考虑贪心，对于每一位数字，仍然可以遍历数组 $b$，使其在符合条件的情况下最小。复杂度 $O(N^2)$。

考虑优化，题目要求 $a_{i-1}\le \min(a_i,b_j-a_i),(1\le j\le m)$，复杂度瓶颈在遍历 $b$ 数组上，所以我们可以使用二分查找，找到 $b$ 数组中第一个大于等于 $a_{i-1}+a_i$ 的值并将其替换 $a_i$，如果这个值比数组中的所有值都大，那么则无法实现。
### Code
#### C1
```cpp

#pragma GCC optimize(1, 2, 3, "Ofast", "inline")
#include <bits/stdc++.h>
using namespace std;
#define ll long long
#define int ll
#define ONLINE_JUDGE
#define MULTI_CASES
#define endl '\n'
const int MaxN = 2e5+100;
const int INF = 1e9;
const int mod=212370440130137957ll;
int T=1, N, M;
int a[MaxN];
inline void Solve()
{
	cin>>N>>M;
    for(int i=1;i<=N;i++){
        cin>>a[i];
    }
    int cnt;
    cin>>cnt;
    int las=-INF;
    for(int i=1;i<=N;i++){
        int x=cnt-a[i];
        if(x<=a[i]){
            if(x>=las){
                las=x;
            }
            else{
                if(a[i]>=las){
                    las=a[i];
                }
                else{
                    puts("NO");
                    return ;
                }
            }
        }
        else{
            if(a[i]>=las){
                las=a[i];
            }
            else{
                if(x>=las){
                    las=x;
                }
                else{
                    puts("NO");
                    return ;
                }
            }
        }
    }
    puts("YES");
}
signed main()
{
#ifndef ONLINE_JUDGE
    freopen(".in", "r", stdin);
    freopen(".out", "w", stdout);
#endif
    ios::sync_with_stdio(0);
    cin.tie(0),cout.tie(0);

#ifdef MULTI_CASES
    cin >> T;
    while (T--)
#endif
       Solve();
    //fclose(stdin);
    //fclose(stdout);
    return 0;
}
```
#### C2
```cpp
#pragma GCC optimize(1, 2, 3, "Ofast", "inline")
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
int a[MaxN];
inline void Solve()
{
    cin >> N >> M;
    for (int i = 1; i <= N; i++)
    {
        cin >> a[i];
    }
    vector<int> b;
    for (int i = 1; i <= M; i++)
    {
        int x;
        cin >> x;
        b.push_back(x);
    }
    sort(b.begin(), b.end());
    int las = a[1];
    for (int i = 0; i < M; i++)
    {
        las = min(las, b[i] - a[1]);
    }
    // cerr<<las<<endl;
    for (int i = 2; i <= N; i++)
    {
        int minn = INF;
        if (a[i] >= las)
        {
            minn = a[i];
        }
        auto x = lower_bound(b.begin(), b.end(), a[i] + las);
        if (x == b.end())
        {
            if (minn == INF)
            {
                puts("NO");
                return;
            }
            else
            {
                las = minn;
            }
        }
        else
        {
            int cnt = x - b.begin();
            las = min(minn, b[cnt] - a[i]);
        }
        // cerr<<las<<" ";
    }
    puts("YES");
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
## D