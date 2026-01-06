---
title: CF1850B Ten Words of Wisdom题解
date: "2023-08-03"
description: 题目简述 在 ​n 个回答中找到长度不超过 $10$ 且质量最高的回答。 题目分析 就是个普通模拟，如果 ​a_i\le 10，就打擂台找最大质量，更新序号。 Code #include &lt;bits/stdc++.h&gt; using namespace std; #define ll long long #define int ll const int MaxN = 1e6 + 100;...
tags: ['题解', 'Codeforces']
draft: false
---
### 题目简述

在 $n$ 个回答中找到长度不超过 $10$ 且质量最高的回答。

### 题目分析

就是个普通模拟，如果 $a_i\le 10$，就打擂台找最大质量，更新序号。

### Code

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
	int n;
	cin>>n;
	int maxn=-1,ans=0;\\记得初始化
	for(int i=0;i<n;i++){
		int a,b;
		cin>>a>>b;
		if(a>10){
			continue;
		}
		if(b>maxn){
			maxn=b;
			ans=i+1;\\因为我的习惯是从零开始，这里的ans更新时需要+1.
		}
	}
	cout<<ans<<endl;
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