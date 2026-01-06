---
title: CF2023B/CF2024D-Skipping-题解
date: "2024-10-21"
description: 首先我们可以发现，在第 $i$ 个点上时，所得的得分为从 $1$ 到 $i$ 之和减去跳过的问题。所以此题可以转化为求跳过的题目的最小值。所以答案
tags: ['题解', 'Codeforces']
draft: false
---
# CF2023B/CF2024D
## 题意分析
首先我们可以发现，在第 $i$ 个点上时，所得的得分为从 $1$ 到 $i$ 之和减去跳过的问题。所以此题可以转化为求跳过的题目的最小值。所以答案就是

$$ans=\max_{i=1}^{n}(sum_i-dis_i)$$

其中的 $sum_i$ 表示从 $1$ 到 $i$ 的前缀和，$dis_i$ 表示从 $1$ 到 $i$ 的代价最小值。

关于如何求 $dis_i$，我们可以建图跑最短路，对 $i\rightarrow i-1$ 建边，权值为 $0$，对 $i\rightarrow b_i$ 建边，权值为 $a_i$。之后通过最短路求出 $dis_i$，然后枚举答案即可。
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
const int MaxN = 4e5+100;
const int INF = 1e15;
const int mod=212370440130137957ll;
int T=1, N, M;
// int dis[MaxN];
vector<pair<int,int>>G1[MaxN];
struct Dijkstra{
	int d[MaxN], vis[MaxN];
	struct Point {
		int id, x;
		inline bool operator<(const Point &aa)const {
			return x > aa.x;
		}
	};
	priority_queue<Point>q;
	inline void solve(int S) {
		for(int i = 1; i <= N; i++) d[i] = INF, vis[i] = 0;

		d[S] = 0;
		q.push((Point){ S, 0 });
		while(!q.empty()) {
			auto [x, w] = q.top(); q.pop();
			if (vis[x]) continue;
			vis[x] = 1;
			for(auto it : G1[x]) {
				int y = it.first;
				int z = it.second;
				if(d[x] + z < d[y]) {
					d[y] = d[x] + z;
					if(!vis[y])  q.push((Point){ y, d[y] });
				}
			}
		}
	}
};
inline void Solve()
{
	cin>>N;
    // vector<pair<int,int>> G1[MaxN];
    vector<int>sum(N+1);
    vector<int>a(N+1);
    for(int i=1;i<=N;i++){
        cin>>a[i];
        sum[i]=sum[i-1]+a[i];
        if(i!=1)
            G1[i+1].push_back(make_pair(i,0));
    }
    for(int i=1;i<=N;i++){
        int x;
        cin>>x;
        G1[i].push_back(make_pair(x,a[i]));
    }
    Dijkstra dij;
    dij.solve(1);
    int ans=0;
    for(int i=1;i<=N;i++){
        // cout<<dij.d[i]<<" ";
        ans=max(ans,sum[i]-dij.d[i]);
        G1[i].resize(0);
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