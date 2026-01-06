---
title: CF1890B Qingshan Loves Strings题解
date: "2023-10-29"
description: 题意简述 给定两个01字符串 ​s,t，你需要在 ​s 之中插入任意个字符串 ​t，使得新的字符串 ​s 中相邻的两个数都不同。 题意分析 由于字符串只有 $0$ 和 $1$，所以最终的字符串一定是 01010101 或 10101010 的形式。而插入的字符串是固定的，所以首先考虑字符串 ​s，如果一个字符串中同时出现 11 和 00 时，字符串一定不能“变好”。 然后我们考虑字符串 ​t 的形...
tags: ['题解', 'Codeforces']
draft: false
---
#### 题意简述

给定两个01字符串 $s,t$，你需要在 $s$ 之中插入任意个字符串 $t$，使得新的字符串 $s$ 中相邻的两个数都不同。

#### 题意分析

由于字符串只有 $0$ 和 $1$，所以最终的字符串一定是 `01010101` 或 `10101010` 的形式。而插入的字符串是固定的，所以首先考虑字符串 $s$，如果一个字符串中同时出现 `11` 和 `00` 时，字符串一定不能“变好”。

然后我们考虑字符串 $t$ 的形式，如果字符串 $t$ 本身就不符合 $t_i \ne t_{i+1}$ 的话，也是不可以的。

如果都字符串都符合的情况下，不难发现，我们只需要记录字符串 $s$ 中包括 `00` 还是 `11`，然后与字符串 $t$ 的两边判断，如果不同，就可以构成。具体判断见代码。

#### Code

```cpp
#include <bits/stdc++.h>
using namespace std;
#define ll long long
#define int ll
const int MaxN = 1e6 + 100;
const int INF = 1e9;
int T=1, N, M;
template<class T>
inline void qread(T &sum)
{
	sum=0;int boo=1;
	char x=getchar();
	while(x<'0'||x>'9'){if(x=='-')boo=-1;x=getchar();}
	while(x>='0'&&x<='9'){sum=(sum<<1)+(sum<<3)+x-'0';x=getchar();}
	sum*=boo;
}
template<class T>
void qput(T x)
{
	if(x<0){
		x=-x;
		putchar('-');}
	if(x>9)
		qput(x/10);
	putchar(x%10+48);
}
inline void Solve()
{
	int n,m;
	cin>>n>>m;

	string s,t;
	cin>>s>>t;

	bool flag=0;
	int cnt=-1;
	for(int i=0;i<n;i++){
		if(s[i]==s[i+1]){
			if(s[i]-'0'!=cnt&&cnt!=-1){
				puts("No");//字符串s
				//cout<<cnt;
				return;
			}
			cnt=s[i]-'0';
			flag=1;

		}
	}

	if(flag==0){
		puts("Yes");
		return;
	}
	for(int i=0;i<t.size();i++){
		if(t[i]==t[i+1]){
			puts("No");//字符串t
			return;
		}
	}
	if(t[0]-'0'!=cnt&&t[m-1]-'0'!=cnt){
		puts("Yes");//字符串s和t判断
		//cout<<cnt
	}
	else{
		puts("No");
	}
}
signed main()
{
	//freopen(".in", "r", stdin);
	//freopen(".out", "w", stdout);
	ios::sync_with_stdio(0);
	//cin.tie(0);
	cin >> T;
	while (T--)
		Solve();
	//fclose(stdin);
	//fclose(stdout);
	return 0;
}

```