---
title: CF2024A-Profitable-Interest-Rate-题解
date: "2024-10-21"
description: Alice有 $a$ 枚硬币，她想要将硬币存入银行，但是开立存款的最低金额为 $b$，如果金额不足，可以花费 $x$ 个硬币使得存款的最低金额减少
tags: ['题解', 'Codeforces']
draft: false
---
# CF2024A
## 题意简述
Alice有 $a$ 枚硬币，她想要将硬币存入银行，但是开立存款的最低金额为 $b$，如果金额不足，可以花费 $x$ 个硬币使得存款的最低金额减少 $2x$。求存入银行的最大硬币数量。
## 题意分析
显然，当 $b\le a$ 时，可以直接将 $a$ 枚硬币全部存入，所以直接输出 $a$ 即可。

反之，当 $b>a$ 时，我们需要花费硬币降低最低金额。不难发现，题目要求最大值，且同时符合单调性，可以使用二分答案来直接计算。答案区间表示存入银行的硬币数量 $ans$，通过``check``判断 $ans$ 与 $b-(a-ans)\times 2$ 的大小关系，如果 $ans\ge b-(a-ans)\times 2$，``check``判断为``true``，将左边界更新即可。

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
bool check(int x)
{
    if(x>=M-(N-x)*2){
        return 1;
    }
    return 0;
}
inline void Solve()
{
	cin>>N>>M;
    if(N>=M){
        cout<<N<<endl;
    }
    else{
        int l=0,r=N;
        while(l<r){
            int mid=(l+r+1)>>1;
            if(check(mid)){
                l=mid;
            }
            else{
                r=mid-1;
            }
        }
        cout<<l<<endl;
    }
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