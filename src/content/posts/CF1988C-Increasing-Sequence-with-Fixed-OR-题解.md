---
title: CF1988C Increasing Sequence with Fixed OR 题解
date: "2024-07-16"
description: 通过观察此数据，可以发现，构造出的数字的二进制存在规律，即将 $n$ 从末位开始将每个 $1$ 都去除一次，这样可以使得相邻两个数的异或值都为 $n$。
tags: ['题解', 'Codeforces']
draft: false
---
# CF1988C
## 题意简述
给定一个正整数 $n$，要构造出一个长度为 $k$ 的严格递增序列 $a$，且每一项 $a_i\le n$。要满足 $a_i|a_{i-1}=n$。
## 题目分析
要使得 $a_i|a_{i-1}=n$，我们不妨先找找规律：

当 $n=14$ 时，可以构造出以下数据：

$a_1=6$

$a_2=10$

$a_3=12$

$a_4=14$

将其转化为 **二进制**：

$0110$\
$1010$\
$1100$\
$1110$

通过观察此数据，可以发现，构造出的数字的二进制存在规律，即将 $n$ 从末位开始将每个 $1$ 都去除一次，这样可以使得相邻两个数的异或值都为 $n$。
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
int Atoi(string s,int radix)    //s是给定的radix进制字符串
{
	int ans=0;
	for(int i=0;i<s.size();i++)
	{
		char t=s[i];
		if(t>='0'&&t<='9') ans=ans*radix+t-'0';
		else ans=ans*radix+t-'a'+10;
	}
	return ans;
}
//n是待转换的十进制数，m是待转换成的进制数 
string intToA(int n,int m){
	string ans="";
	do{		 //使用do{}while()循环类型以防止输入为0的情况
		int t=n%m;
		if(t>=0&&t<=9)    
			ans+=(t+'0');
		else 
			ans+=(t+'a'-10);
		n/=m;
	}while(n);   
	reverse(ans.begin(),ans.end());
	return ans;    
}

inline void Solve()
{
	cin>>N;
//	char s1[MaxN];
	string s;
	s=intToA(N,2);
	
	M=1;
//	cout<<s<<endl;
	for(int i=0;i<s.size();i++){
		if(s[i]=='1'){
			M++;
		}
	}
	if(M==2){
		cout<<1<<endl<<N<<endl;
		return;
	}
	cout<<M<<endl;
	for(int i=0;i<s.size();i++){
		if(s[i]=='1'){
			string str=s;
			str[i]='0';
			cout<<Atoi(str,2)<<" ";
		}
	}
	cout<<N<<endl;
//	cout<<endl;
//	cout<<s<<endl;
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