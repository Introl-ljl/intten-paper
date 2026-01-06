---
title: CF2024C-Concatenation--of-Arrays-题解
date: "2024-10-21"
description: 给定 $n$ 个二维数组，每个数组的长度为 $2$，将这 $n$ 个数组连接起来，要使得数组中的逆序对数量尽可能的少。
tags: ['题解', 'Codeforces']
draft: false
---
# CF2024C
## 题意简述
给定 $n$ 个二维数组，每个  数组的长度为 $2$，将这 $n$ 个数组连接起来，要使得数组中的逆序对数量尽可能的少。
## 题意分析
题目要求排列数组使得逆序对尽可能少，对于其中一个数组，其可能贡献的逆序对数量为比 $a_{i,1}$ 小的个数 $x$，加上比 $a_{i,2}$ 小的个数 $y$，设 $cnt_i$ 为 $x+y$，之后只需要对数组 $cnt$ 排序输出结果即可。

**注意，只要 $a_{i,1}$ 和 $a_{i,2}$ 不相同，得出的结果应该减去 $1$，这是因为必然会有一个数比另一个数小，所以要排除掉。**

关于求解比当前数小的个数，我们可以使用二分查找函数``lower_bound``来求解。

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
// int a[MaxN];
struct node{
    int x,y;
    int id;
}a[MaxN];
bool cmp1(node a,node b){
    return min(a.x,a.y)<min(b.x,b.y);
}
bool cmp2(node a,node b){
    return max(a.x,a.y)>max(b.x,b.y);
}
bool cmp(node a,node b){
    return a.id<b.id;
}
int cnt[MaxN];
inline void Solve()
{
	cin>>N;
    for(int i=1;i<=N;i++){
        cin>>a[i].x>>a[i].y;
        a[i].id=i;
    }
    vector<int>b;
    for(int i=1;i<=N;i++){
        b.push_back(a[i].x);
        b.push_back(a[i].y);
    }
    sort(b.begin(),b.end());
    for(int i=1;i<=N;i++){
        if(a[i].x<a[i].y){
            int x=lower_bound(b.begin(),b.end(),a[i].x)-b.begin();
            int y=lower_bound(b.begin(),b.end(),a[i].y)-b.begin()-1;
            cnt[i]=x+y;
        }   
        else{
            if(a[i].x>a[i].y){
                int x=lower_bound(b.begin(),b.end(),a[i].x)-b.begin()-1;
                int y=lower_bound(b.begin(),b.end(),a[i].y)-b.begin();
                cnt[i]=x+y; 
            }
            else{
                int x=lower_bound(b.begin(),b.end(),a[i].x)-b.begin();
                int y=lower_bound(b.begin(),b.end(),a[i].y)-b.begin();
                cnt[i]=x+y; 
            }
        }
    }
    for(int i=1;i<=N;i++){
        a[i].id=cnt[i];
    }
    sort(a+1,a+N+1,cmp);
    for(int i=1;i<=N;i++){
        cout<<a[i].x<<" "<<a[i].y<<" ";
    }
    cout<<endl;
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