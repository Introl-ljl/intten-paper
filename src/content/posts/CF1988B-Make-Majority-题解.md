---
title: CF1988B-Make-Majority-题解
date: "2024-07-16"
description: 根据题意，每次操作可以将 $[l,r]$ 区间的数变为 $1$ 个**多数**，要求能否转化为 $a=[1]$。不难想出，
tags: ['题解', 'Codeforces']
draft: false
---
# CF1988B
## 题目分析
根据题意，每次操作可以将 $[l,r]$ 区间的数变为 $1$ 个**多数**，要求能否转化为 $a=[1]$。不难想出，我们应该将序列中 $0$ 的个数降为最低，所以可以将每一段连续的 $0$ 都进行操作使得最后的时候序列中所包含的 $0$ 最少，然后只需要遍历序列统计 $c_0$ 和 $c_1$ 的个数，比较两数，如果 $c_1>c_0$ 则为```Yes```。
## Code
```cpp
//#pragma GCC optimize(1, 2, 3, "Ofast", "inline")
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
inline void Solve()
{
	int N;
	cin>>N;
	string s;
	cin>>s;
	int xx[MaxN],n=0;
//	memset(xx,0,sizeof xx);
	bool f=0;
	for(int i=0;i<N;i++){
//		cout<<f<<endl;
//		cout<<s[i];
		if(s[i]=='0'&&!f){
			xx[n++]=0;//尽可能减少0的数量
			f=1;
		}
		else{
			if(s[i]!='1'){
				continue;
			}
			f=0;
			xx[n++]=1;
		}
//		cout<<xx[n-1];
	}
	int sum0=0,sum1=0;
	for(int i=0;i<n;i++){
		if(xx[i]==1){
			sum1++;
		}
		else{
			sum0++;
		}
	}
//	cout<<sum0<<" "<<sum1<<endl;
	if(sum0>=sum1){
		puts("No");
	}
	else{
		puts("Yes");
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