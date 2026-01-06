---
title: CF2024B-Buying-Lemonade-题解
date: "2024-10-21"
description: 给定 $n$ 个按钮，每个按钮对应 $a_i$ 瓶柠檬水，你不清楚哪个按钮对应哪个 $a_i$，按下按钮后，如果有柠檬水就会掉落一瓶，反之则没有任何东西。求至少按多少次按钮可以保证至少收到 $k$ 瓶柠檬水。
tags: ['题解', 'Codeforces']
draft: false
---
# CF2024B
## 题意简述
给定 $n$ 个按钮，每个按钮对应 $a_i$ 瓶柠檬水，你不清楚哪个按钮对应哪个 $a_i$，按下按钮后，如果有柠檬水就会掉落一瓶，反之则没有任何东西。求至少按多少次按钮可以保证至少收到 $k$ 瓶柠檬水。
## 题意分析
首先题目要求保证至少收到 $k$ 瓶，那么我们可以考虑最坏的情况：每次选择一个按钮时都会选择到容量最少的那个。

在这种情况下，我们不可避免的每个按钮多按一次。所以我们可以考虑贪心。首先可以将 $a_i$ 排序，然后从小到大依次更新获取到的柠檬水数量，同时每次将操作次数多加 $1$。显然这样不是最优，所以在更新过程中考虑，由于每次读取的都比之后的小，所以如果当前的值乘上剩余的按钮数量再加上已经获得的柠檬水数量之和大于等于 $k$，就直接加上 $k$，减去已获得的柠檬水数量就是答案。

形式化的说，设操作次数为 $cnt$，答案为 $ans$，

则对于 $1\le i\le n$，若$ans+(n-i+1)\times a_i<k,ans=ans+a_i,cnt=cnt+a_i+1$。

若 $ans+(n-i+1)\times a_i\ge k, cnt=cnt+k-ans$ 此时的 $cnt$ 就是答案。
## Code
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
    sort(a+1,a+N+1);
    if(M<=N){
        cout<<M<<endl;
        return;
    }
    int ans=0,cnt=0;
    for(int i=1;i<=N;i++){
        if(cnt+(N-i+1)*a[i]>=M){
            ans+=M-cnt;
            cout<<ans<<endl;return;
        }
        cnt+=a[i];
        ans+=a[i]+1;
    }
    cout<<ans<<endl;
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