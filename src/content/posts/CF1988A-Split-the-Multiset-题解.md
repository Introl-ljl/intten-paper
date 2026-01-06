---
title: CF1988A-Split the Multiset 题解
date: "2024-07-16"
description: 给定一个正整数 $n$，每次可以将其拆分成 $k$ 个数，求将 $n$ 变为 $n$ 个 $1$ 的最少操作次数。
tags: ['题解', 'Codeforces']
draft: false
---
# CF1988A
## 题意简述
给定一个正整数 $n$，每次可以将其拆分成 $k$ 个数，求将 $n$ 变为 $n$ 个 $1$ 的最少操作次数。
## 题目分析
对于一个数 $n$，我们每次可以将其拆分为 $(k-1)$ 个 $1$，和 $1$ 个 $(n-k)$，所以只需要暴力枚举 $n$ 能被拆分几次，就可以得出答案，具体见下：

当 $n=5,k=2$时：
- $5$
- $1,4$
- $1,1,3$
- $1,1,1,2$
- $1,1,1,1,1$

不难发现只需要每次将 $n$ 减去 $k-1$，一直减到 $n<=1$，此时的操作次数即为答案。
## Code
```cpp
#pragma GCC optimize(1, 2, 3, "Ofast", "inline")
#include <bits/stdc++.h>
using namespace std;
#define ll long long
#define int ll
#define ONLINE_JUDGE
#define MULTI_CASES
const int MaxN = 2e5+100;
const int INF = 1e9;
int T=1, N, M;
int a[MaxN];
int ans=0;
inline void Solve()
{
	cin>>N>>M;
	if(N==1){
		cout<<0<<endl;
		return ;
	}
	ans=0;
	for(int i=1;;i++){
		N-=M-1;
//		cout<<N<<endl;
		ans++;
		if(N<=1){
			break;
		}
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