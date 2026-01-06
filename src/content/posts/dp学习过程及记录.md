---
title: dp学习过程及记录
date: "2025-10-31"
description: 在dp学习过程中的一些理解及总结，长期更新。
tags: ["动态规划", "学习笔记", "算法"]
draft: false
---
# 关键点
- dp的参数
- dp的状态转移方程
- 初始化
- 细节部分
# P1020 [NOIP1999 提高组] 导弹拦截
[Link](https://www.luogu.com.cn/problem/P1020)
## 解析
这道题分为两问，涉及动态规划及贪心思想
### Question 1.
根据题意，第一问求的即为**最长不上升子序列**。属于非常典型的dp。
#### $O(N^2)$ 做法
参数：设 $dp_i$ 表示以 $a_i$ 结尾的最长不上升子序列，最终答案即为 $\max_{1\le i \le n}dp_i$。

转移方程：$$dp_i=\max_{1\le j<i,a_j\le a_i}(dp_i+1)$$

复杂度：$O(N^2)$。
#### $O(n \log n)$ 做法
当 $n$ 的范围扩大到 $n \leq 10^5$ 时，第一种做法就不够快了，下面给出了一个 $O(n \log n)$ 的做法。

>回顾一下之前的状态：$(i, l)$。\
但这次，我们不是要按照相同的 $i$ 处理状态，而是直接判断合法的 $(i, l)$。\
再看一下之前的转移：$(j, l - 1) \rightarrow (i, l)$，就可以判断某个 $(i, l)$ 是否合法。\
初始时 $(1, 1)$ 肯定合法。\
那么，只需要找到一个 $l$ 最大的合法的 $(i, l)$，就可以得到最终最长不下降子序列的长度了。\
\
摘自[**OI wiki** 最长不下降子序列](https://oiwiki.org/dp/basic/#%E6%9C%80%E9%95%BF%E4%B8%8D%E4%B8%8B%E9%99%8D%E5%AD%90%E5%BA%8F%E5%88%97)

根据此思路，可以进行如下分析：

参数：$dp_i$ 为所有的长度为 $i$ 的不下降子序列的末尾元素的最小值，$len$ 为子序列的长度。

做法：当前已知长度为 $1$，所以可从 $2$ 到 $n$ 循环，求出前 $i$ 个元素的最长长度，循环过程中不断更新维护 $dp$ 数组及 $len$ 的长度。

**如何维护？**

考虑每一步的决策，

当 $a_i\le dp_{len}$ 时，显然 可以将其插入序列末尾，$len+=1$。

反之，可以将 $dp$ 序列中**第一个大于它的元素**更新为 $a_i$。这一步中可以使用[二分](\学习笔记-3-二分.md)解决。

---
至此，Que 1.解决。
### Question 2.
第二问要求拦截所有导弹所需的最小数量。
#### 考虑贪心
从第一问来考虑，一套系统所拦截的即为当前的最长不上升子序列，推广考虑，多套系统拦截即为每次删除最长不上升子序列之后重复操作。所以根据**Dilworth**定理可得，**最长上升子序列的长度就是能构成的不上升序列的个数**。

所以第二问实际上即为求解最长上升子序列的长度，算法与 **Que 1.** 基本相同，稍微改动即可。
## Code
```cpp
// #pragma GCC optimize(1, 2, 3, "Ofast", "inline")
#include <bits/stdc++.h>
using namespace std;
#define ll long long
#define int ll
#define ONLINE_JUDGE
// #define MULTI_CASES
#define endl '\n'
const int MaxN = 2e5+100;
const int INF = 1e9;
const int mod=212370440130137957ll;
int T=1, N, M;
int a[MaxN];
int dp[MaxN],dp2[MaxN];

inline void Solve()
{
    int x;
	while(cin>>x){
        a[++N]=x;
    }
    dp[1]=a[1];
    int len=1;
    for(int i=2;i<=N;i++){
        if(a[i]<=dp[len]){
            
            dp[++len]=a[i];
        }
        else{
            int cnt=upper_bound(dp+1,dp+len+1,a[i],greater<int>())-dp;
            dp[cnt]=a[i];
        }
    }
    cout<<len<<endl;
    // return;
    len=1;
    dp2[1]=a[1];
    for(int i=2;i<=N;i++){
        if(a[i]>dp2[len]){
            len++;
            dp2[len]=a[i];
        }
        else{
            int cnt=lower_bound(dp2+1,dp2+len+1,a[i])-dp2;
            dp2[cnt]=a[i];
        }
    }
    cout<<len<<endl;
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
# P1026 [NOIP2001 提高组] 统计单词个数
## 解析
本题求解将一个字符串拆分成 $k$ 个部分，使得每份中包含的单词个数总数最大。

数据很小，考虑 $dp$ 做法。

首先，预处理 $sum_{i,j}$ 数组，表示从 $i$ 到 $j$ 的单词数。从后往前推，可得
$$sum_{i,j}=sum_{i+1,j}$$
如果存在从 $a_i$ 开头的单词，则再加一（注意只加一次）。

关于参数，可以从 $answer$ 角度逆向去推，本题所求为分成 $k$ 份以后，包含单词的最大个数。通过简单推理可得，本题 $dp$ 有三个参数，即为：

- 最大个数
- 分为 $k$ 份
- 字符串长度 **（这个条件没有明显指出，但十分关键，且在dp类做法中较为常见）**

之后推理可得，$dp_{i,j}$ 表示一个长度为 $i$ 的字符串在拆分为 $k$ 份时，最多的单词个数。


考虑状态转移方程，设断点 $r\in [j,i)$ 可以得出：
$$ dp_{i,j}=\max_{j\le r<i}(dp_{i,j},dp_{r,j-1}+sum_{r+1,i})$$

大体方向确定后，考虑初始化，
$$dp_{i,j}=sum_{i,i}+dp_{i-1,i-1}$$
$$dp_{i,1}=sum_{1,i}$$
## 错误汇总
**RE on #3~#10**：数组大小开为 $k$，忽略了实际长度应该为 $k\times 20$。
## Code
```cpp
// #pragma GCC optimize(1, 2, 3, "Ofast", "inline")
#include <bits/stdc++.h>
using namespace std;
#define ll long long
#define int ll
#define ONLINE_JUDGE
// #define MULTI_CASES
#define endl '\n'
const int MaxN = 800;
const int INF = 1e9;
const int mod=212370440130137957ll;
int T=1, N, M, K;
int a[MaxN];
string sa[10];
string s={},s1;

int sum[MaxN][MaxN];
bool check(int l,int r){
    string x=s.substr(l,r-l+1);
    for(int i=1;i<=K;i++){
        if(x.find(sa[i])==0){
            return true;
        }
    }
    return false;
}
void init(){
    for(int i=N;i>=1;i--){
        for(int j=i;j>=1;j--){
            sum[j][i]=sum[j+1][i];
            if(check(j,i))sum[j][i]++;
        }
    }
}
int dp[MaxN][MaxN];
inline void Solve()
{
	cin>>N>>M;
    s+=' ';
    for(int i=1;i<=N;i++){
        cin>>s1;
        s+=s1;
    }
    N*=20;
    cin>>K;
    for(int i=1;i<=K;i++){
        cin>>sa[i];
    }
    init();
    // dp[0][0]=sum[0][0];
    dp[0][0]=0;
    for(int i=1;i<=M;i++){
        dp[i][i]=dp[i-1][i-1]+sum[i][i];
    }
    for(int i=1;i<=N;i++){
        dp[i][1]=sum[1][i];
    }
    for(int i=1;i<=N;i++){
        for(int j=1;j<=M&&j<i;j++){
            for(int r=j;r<i;r++){
                dp[i][j]=max(dp[i][j],dp[r][j-1]+sum[r+1][i]);
            }
        }
    }
    cout<<dp[N][M];  
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
# P11187 配对序列
## 解析
根据题意，此题要求出序列中符合 $c_1,c_1,c_2,c_2$ 这种两两相同的最长子序列。

要求子序列最大值，显然我们可以使用 $dp$ 做法。

考虑参数，设 $dp_i$ 表示以 $i$ 为结尾的符合条件的子序列最大值。最终的答案即为 

$$\max_{1\le i\le n}{dp_i}$$

考虑预处理，我们可以先预处理出 $pre_i$，表示序列中上一个与 $a_i$ 相同的数的位置。具体实现也十分简单，使用``map``即可。

不难得出，$pre_i$ 如果不为 $0$，则 $dp_i$ 才会有值。又因为每个数字都是成对出现的，所以，只需要找到与这个数相同的**上一个数**和**上一个数的上一个数**，求出从**上一个数的上一个数**的下一位至**上一个数**的前一位的最大值，这样可以满足 $1\le i<k,s2_i\ne s2_{i+1}$ 的条件。再加上当前的 $2$ 就是 $dp_i$ 的答案。

即 

$$dp_i=\max_{j=pre_{pre_i}}^{pre_i-1}{dp_j+2}$$

关于求 $\max$ 的操作，我们可以使用数据结构优化，比如线段树或者ST表等。

**注意如果 $pre_i=0$ 则应该跳过。**
## Code
```c++
// #pragma GCC optimize(1, 2, 3, "Ofast", "inline")
#include <bits/stdc++.h>
using namespace std;
#define ll long long
#define int ll
#define ONLINE_JUDGE
// #define MULTI_CASES
#define endl '\n'
const int MaxN = 5e5+100;
const int INF = 1e9;
const int mod=212370440130137957ll;
int T=1, N, M;
int a[MaxN];
int pre[MaxN];
struct Segment{
    struct Point{
        int l,r,tag;
        int mex;
    };
    vector<int>a;   
    vector<Point>t;
    Segment(int N){
        a.assign(N+10,0);
        t.assign(N<<4,{});
    }
    #define ls p<<1
    #define rs p<<1|1
    int midd(int p){
        return (t[p].l+t[p].r)>>1;
    }
    void push_up(int p){
        t[p].mex=max(t[ls].mex,t[rs].mex);
    }
    void change(int p,int k,int q){
        int l=t[p].l,r=t[p].r;
        if(l==r&&l==q){
            t[p].mex+=k;
            return;
        }
        int mid=midd(p);
        if(q<=mid){
            change(ls,k,q);
        }
        if(mid<q){
            change(rs,k,q);
        }
        push_up(p);
    }
    void build(int p,int nl,int nr){
        t[p].l=nl,t[p].r=nr;
        if(nl==nr){
            t[p].mex=a[nl];
            return;
        }
        int mid=midd(p);
        build(ls,nl,mid);
        build(rs,mid+1,nr);
        push_up(p);
    }
    int query(int p,int nl,int nr){
        int l=t[p].l,r=t[p].r;
        if(nl<=l&&r<=nr){
            return t[p].mex;
        }
        int mid=midd(p);
        int ans=0;
        if(nl<=mid){
            ans=max(ans,query(ls,nl,nr));
        }
        if(mid<nr){
            ans=max(ans,query(rs,nl,nr));
        }
        return ans;
    }
};
inline void Solve()
{
    map<int,int>mp;
    cin>>N;
    Segment Tree(N);
    for(int i=1;i<=N;i++){
        cin>>a[i];
        // Tree.a[i]=a[i];
        if(mp[a[i]]==0){
            mp[a[i]]=i;
            pre[i]=0;
        }
        else{
            pre[i]=mp[a[i]];
            mp[a[i]]=i;
        }
    }
    pre[0]=0;
    Tree.build(1,1,N);
    // Tree.change(1,1,1);
    // cout<<1;return;
    // vector<int>dp(N+1);
    for(int i=1;i<=N;i++){
        if(pre[i]==0)
            continue;
        int maxn=Tree.query(1,pre[pre[i]]+1,pre[i]-1);
        // cout<<maxn<<" ";
        Tree.change(1,maxn+2,i);
    }
    
    cout<<Tree.query(1,1,N);
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
# P11188 「KDOI-10」商店砍价
## 解析
此题中 $v_i\le 10^5$ 不难得出如果要花费 $n$ 的代价删除剩余的数，数位一定不能大于 $6$。

由此可得，设 $dp_{i,j}$ 表示前 $i$ 位中已经删除 $j$ 个数时，删除所有数位的最小代价。

不难得出，每保留单独的一位，代价就会增加 $10^{j-1}\times s_i-v_i$。所以我们可以从后往前递推，

可得 

$$dp_{i,j}=\min(dp_{i,j},dp_{i,j+1}+10^{j-1}\times s_i-v_i)$$

显然，我们可以使用滚动数组来优化空间，所以最终的式子为：
$$dp_j=\min(dp_j,dp_{j+1}+10^{j-1}\times s_i-v_i)$$
## Code
```c++
// #pragma GCC optimize(1, 2, 3, "Ofast", "inline")
#include <bits/stdc++.h>
using namespace std;
#define ll long long
#define int ll
#define ONLINE_JUDGE
#define MULTI_CASES
#define endl '\n'
const int MaxN = 2e5+100;
const int INF = 1e18;
const int mod=212370440130137957ll;
int T=1, N, M;
int a[MaxN];
int binpow(int a,int b){
    if(b==0){
        return 1;
    }
    int res=binpow(a,b/2);
    if(b%2){
        return res*res*a;
    }
    else{
        return res*res;
    }
}
inline void Solve()
{
	string s;
    cin>>s;
    for(int i=1;i<=9;i++){
        cin>>a[i];
    }
    int ans=0;
    for(int i=0;i<s.size();i++)
    {
        ans+=a[s[i]-'0'];
    }
    int sum=ans;
    // cout<<ans<<endl;
    for(int i=6;i>=1;i--){
        vector<int>dp(10);
        dp.assign(10,INF);
        dp[i]=sum;
        for(int j=1;j<=s.size();j++){
            for(int ii=1;ii<=i;ii++){
                dp[ii]=min(dp[ii],dp[ii+1]+binpow(10,ii-1)*(s[j-1]-'0')-a[s[j-1]-'0']);
            }
        }
        ans=min(ans,dp[1]);
        // cout<<dp[1]<<' ';
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
    cin>>T;
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
# CF2025D Attribute Checks
## 解析
本题给定了两种属性，在过程中会获得 $m$ 个属性点，以及多次check，求使得通过的check数最多。

考虑 $dp$ 做法，首先是 $dp$ 的状态，设 $dp_{i,j}$ 表示获得 $i$ 个属性点，并将 $j$ 个属性点加在智力，将 $i-j$ 个属性点加在力量上时，能够通过的最多检查数。

考虑状态转移，显然可得：

对于 $a_i(1\le i\le n)$，若 $a_i>0$：

$$dp_{cnt,j}=\max_{j=a_i}^{cnt}(dp_{cnt-1,j},dp_{cnt-1,j-1})$$

若 $a_i<0$：

$$dp_{cnt,j}=\max_{j=cnt-\lvert a_i\rvert}^{0}(dp_{cnt,j}+1,dp_{cnt-1,j}+1)$$

若 $a_i=0$：

$$dp_{cnt,j}=dp_{cnt-1,j}(0\le j<cnt)$$


考虑优化，可以发现，在``cnt``更新之后，只要check的值小于等于``cnt``，只需要将值加一即可。因此我们可以优化掉第一维只保留第二维。对于区间修改，可以使用线段树来实现。

## Code
### TLE
```c++
#pragma GCC optimize(1, 2, 3, "Ofast", "inline")
#include <bits/stdc++.h>
using namespace std;
#define ll long long
#define int ll
#define ONLINE_JUDGE
// #define MULTI_CASES
#define endl '\n'
const int MaxN = 2e6+100;
const int INF = 1e9;
const int mod=212370440130137957ll;
int T=1, N, M;
int a[MaxN];
int dp[5000][5000];
inline void Solve()
{
	cin>>N>>M;
    for(int i=1;i<=N;i++){
        cin>>a[i];
    }
    int cnt=0;
    for(int i=1;i<=N;i++){
        if(a[i]==0){
            cnt++;
            for(int j=0;j<cnt;j++){
                dp[cnt][j]=dp[cnt-1][j];
            }
        }
        else{
            if(a[i]>0){
                for(int j=a[i];j<=cnt;j++){
                    dp[cnt][j]=max(dp[cnt][j]+1,dp[cnt-1][j-1]+1);
                }
            }
            else{
                for(int j=cnt-abs(a[i]);j>=0;j--){
                    dp[cnt][j]=max(dp[cnt][j]+1,dp[cnt-1][j]+1);
                }
            }
        }
    }
    int ans=0;
    for(int i=0;i<=cnt;i++){
        ans=max(ans,dp[cnt][i]);
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
### AC
```c++
#pragma GCC optimize(1, 2, 3, "Ofast", "inline")
#include <bits/stdc++.h>
using namespace std;
#define ll long long
#define int ll
#define ONLINE_JUDGE
// #define MULTI_CASES
#define endl '\n'
const int MaxN = 2e6+100;
const int INF = 1e9;
const int mod=212370440130137957ll;
int T=1, N, M;
int a[MaxN];
// int dp[500][5000];
struct Segment{
    vector<int>a;
    struct Point{
        int l,r,tag;
        int mex;
    };
    vector<Point>t;
    Segment(int N){
        a.assign(N,0);
        t.assign(N<<2,{});
    }
    #define ls p<<1
    #define rs p<<1|1
    int midd(int p){
        return (t[p].l+t[p].r)>>1;
    }
    void push_up(int p){
        t[p].mex=max(t[ls].mex,t[rs].mex);
    }
    void pls(int p,int k){
        t[p].tag+=k;
        t[p].mex+=k;
    }
    void push_down(int p){
        if(t[p].tag){
            pls(ls,t[p].tag);
            pls(rs,t[p].tag);
            t[p].tag=0;
        }
    }
    void build(int p,int l,int r){
        t[p].l=l,t[p].r=r;
        if(l==r){
            t[p].mex=a[l];
            return;
        }
        build(ls,l,midd(p));
        build(rs,midd(p)+1,r);
        push_up(p);
    }
    void dfs(int p,int l,int r){
        if(l==r){
            a[l]=t[p].mex;
            return;
        }
        int mid=midd(p);
        push_down(p);
        dfs(ls,l,mid);
        dfs(rs,mid+1,r);
        push_up(p);
    }
    void change(int p,int nl,int nr,int k){
        int l=t[p].l,r=t[p].r;
        if(nl<=l&&r<=nr){
            pls(p,k);
            return;
        }
        push_down(p);
        int mid=midd(p);
        if(nl<=mid){
            change(ls,nl,nr,k);
        }
        if(mid<nr){
            change(rs,nl,nr,k);
        }
        push_up(p);
    }
    int query_max(int p,int nl,int nr){
        int l=t[p].l,r=t[p].r;
        if(nl<=l&&r<=nr){
            return t[p].mex;
        }
        int mid=midd(p),ans=0;
        push_down(p);
        if(nl<=mid){
            ans=max(ans,query_max(ls,nl,nr));
        }
        if(mid<nr){
            ans=max(ans,query_max(rs,nl,nr));
        }
        return ans;
    }
};
inline void Solve()
{
	cin>>N>>M;
    for(int i=1;i<=N;i++){
        cin>>a[i];
    }
    int cnt=0;
    Segment Tree(M+10);
    Tree.build(1,0,M);
    for(int i=1;i<=N;i++){
        if(a[i]==0){
            cnt++;
            Tree.dfs(1,0,M);
            for(int j=M;j>=1;j--)
                Tree.a[j]=max(Tree.a[j],Tree.a[j-1]);
            Tree.build(1,0,M);
        }
        else{
            if(a[i]>0){
                if(cnt>=a[i])
                    Tree.change(1,a[i],cnt,1);
            }
            else{
                if(cnt>=abs(a[i]))
                    Tree.change(1,0,cnt-abs(a[i]),1);
            }
        }
        
    }
    // cerr<<cnt;return;
    // cout<<1;return;
    int ans=0;
    
    cout<<Tree.query_max(1,0,cnt)<<endl;
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
# P4059 找爸爸（daddy）

## 题目分析

题目要求DNA序列的最大相似程度，考虑 $dp$ 做法，可以得出 $dp_{i,j,k}$ 表示 a序列长度为 $i$，b序列长度为 $j$ ，末尾有/无空格（$k=0$ 无空格，$k=1$ 表示a序列有空格，$k=2$ 表示b序列末尾有空格）时的最大相似程度。

关于空格，对于每段连续空格，相似程度为 $-A-B\times (k-1)$ 因为 $A,B$ 都是正整数，所以其相似程度一定为负数。对于一个空格，会减少 $A$ 点相似度，如果在后面多添加一个空格，则会进一步减少 $B$ 点相似度。

状态转移方程如下：

$$dp_{i,j,0}=\max(dp_{i-1,j-1,0},dp_{i-1,j-1,1},dp_{i-1,j-1,2})+a_{s1_i,s2_j}$$

$$dp_{i,j,1}=\max(dp_{i-1,j,0}-A,dp_{i-1,j,1}-B,dp_{i-1,j,2}-A)$$

$$dp_{i,j,2}=\max(dp_{i,j-1,0}-A,dp_{i,j-1,1}-A,dp_{i,j-1,2}-B)$$

### Code

```cpp
// #pragma GCC optimize(1, 2, 3, "Ofast", "inline")
#include <bits/stdc++.h>
using namespace std;
#define ll long long
#define int ll
// #define ONLINEJUDGE
// #define MULTI_CASES
const int MaxN = 2e3 + 100;
const int INF = 1e18;
int T = 1, N, M;
int a[10][10];
int dp[MaxN][MaxN][4];
int A, B;

int g(int k)
{
    return -A - B * (k - 1);
}
inline void Solve()
{
    string s1, s2;
    cin >> s1 >> s2;
    s1 = ' ' + s1;
    s2 = ' ' + s2;
    map<char, int> mp;
    mp['A'] = 1;
    mp['T'] = 2;
    mp['G'] = 3;
    mp['C'] = 4;
    for (int i = 1; i <= 4; i++)
    {
        for (int j = 1; j <= 4; j++)
        {
            cin >> a[i][j];
        }
    }
    cin >> A >> B;
    for (int i = max(s1.size(), s2.size()); i >= 1; i--)
    {
        dp[0][i][0] = dp[i][0][0] = dp[0][i][2] = dp[i][0][1] = dp[0][i][1] = dp[i][0][2] = -INF;
        dp[0][i][1] = dp[i][0][2] = g(i);
    }
    for (int i = 1; i < s1.size(); i++)
    {
        for (int j = 1; j < s2.size(); j++)
        {
            dp[i][j][0] = max({dp[i - 1][j - 1][0], dp[i - 1][j - 1][1], dp[i - 1][j - 1][2]}) + a[mp[s1[i]]][mp[s2[j]]];
            dp[i][j][1] = max({dp[i - 1][j][0] - A, dp[i - 1][j][1] - B, dp[i - 1][j][2] - A});
            dp[i][j][2] = max({dp[i][j - 1][0] - A, dp[i][j - 1][1] - A, dp[i][j - 1][2] - B});
        }
    }
    cout << max({dp[s1.size() - 1][s2.size() - 1][0], dp[s1.size() - 1][s2.size() - 1][1], dp[s1.size() - 1][s2.size() - 1][2]}) << endl;
}
signed main()
{
#ifndef ONLINEJUDGE
    freopen("daddy.in", "r", stdin);
    freopen("daddy.out", "w", stdout);
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
# P3558 [POI 2013] BAJ-Bytecomputer
## description
给定一个由集合 ${-1,0,1}$ 组成的长度为 $n$ 的序列，可以进行多次操作：

每次操作，对于任何 $1\le i<n$，$x_{i+1}:=x_{i+1}+x_i$。

要求将序列转化为非递减序列，并使得操作次数最少。
## Solution
不难发现，操作后的序列一定只会有 ${-1,0,1}$ 这三个数。

那么考虑dp，设 $f_{i,j}$ 表示前 $i$ 个数组成的序列是非递减序列，且序列的最后一位是 $j$。

接下来考虑转移，这里可以通过 **分类讨论** 来解决。

### Case 1

首先考虑 $a_i=-1$ 的情况。

$$f_{i,-1}=\min(f_{i-1,-1},f_{i,-1})$$

$$f_{i,1}=\min(f_{i-1,1}+2,f_{i,1})$$

这里的第一个公式好理解，就是直接转移。第二个公式可以将其理解为对于前一位是 $1$ 的情况下，可以通过修改第 $i$ 位两次来使得第 $i$ 位仍然是 $1$。

那么为什么不能转移到 $f_{i,0}$ 呢？因为显然想要使得 $-1$ 变大，其前一位必须是 $1$。这样又不符合非递减的要求，所以无法转移。
### Case2

同理考虑 $a_i=0$ 的情况。

$$f_{i,-1}=\min(f_{i-1,-1}+1,f_{i,-1})$$

$$f_{i,0}=\min(f_{i-1,0},f_{i-1,-1})$$

$$f_{i,1}=\min(f_{i-1,1}+1,f_{i,1})$$

第一个转移，我们要让 $a_i$ 变小，所以只能通过 $f_{i-1,-1}+1$ 转移。

第二个转移，$a_i$ 保持不变，所以其可以从 $f_{i-1,-1}$ 和 $f_{i-1,0}$ 直接转移。

第三个转移，$a_i$ 变大，所以只能通过 $f_{i-1,1}+1$ 转移。

### Case3

最后考虑 $a_i=1$ 的情况。

$$f_{i,-1}=\min(f_{i-1,-1}+2,f_{i,-1})$$

$$f_{i,0}=\min(f_{i-1,-1}+1,f_{i,-1})$$

$$f_{i,1}=\min(f_{i-1,-1},f_{i-1,0},f_{i-1,1})$$

第一个转移，$a_i$ 变小，所以只能通过 $f_{i-1,-1}+2$ 来转移。

第二个转移，$a_i$ 变为 $0$，所以只能通过 $f_{i-1,-1}+1$ 来转移。

第三个转移，$a_i$ 保持不变，所以可以通过 $f_{i-1,-1},f_{i-1,0},f_{i-1,1}$ 直接转移。

## Code
由于数组下标不能为负数，所以所有的 $j$ 统一加一。
```cpp
#include <bits/stdc++.h>
using namespace std;
// #define MULTI_CASES
#define ll long long
#define int ll
#define endl '\n'
#define vi vector<int>
#define PII pair<int, int>
const int MaxN = 1e6 + 100;
const int INF = 1e9;
const int mod = 1e9 + 7;
int T = 1, N, M;
int a[MaxN];
int dp[MaxN][10];
inline void Solve()
{
    cin >> N;
    for (int i = 1; i <= N; i++)
    {
        cin >> a[i];
    }
    for (int i = 1; i <= N; i++)
    {
        for (int j = 0; j <= 2; j++)
        {
            dp[i][j] = INF;
        }
    }
    dp[1][a[1] + 1] = 0;
    for (int i = 1; i < N; i++)
    {
        if (a[i + 1] == -1)
        {
            dp[i + 1][0] = min(dp[i + 1][0], dp[i][0]);
            dp[i + 1][2] = min(dp[i + 1][2], dp[i][2] + 2);
        }
        if (a[i + 1] == 0)
        {
            dp[i + 1][1] = min(dp[i][0], dp[i][1]);
            dp[i + 1][0] = min(dp[i][0] + 1, dp[i + 1][0]);
            dp[i + 1][2] = min(dp[i + 1][2], dp[i][2] + 1);
        }
        if (a[i + 1] == 1)
        {
            dp[i + 1][2] = min({dp[i + 1][2], dp[i][1], dp[i][0], dp[i][2]});
            dp[i + 1][1] = min(dp[i + 1][1], dp[i][0] + 1);
            dp[i + 1][0] = min(dp[i + 1][0], dp[i][0] + 2);
        }
    }
    int ans = min({dp[N][1], dp[N][0], dp[N][2]});
    if (ans == INF)
    {
        cout << "BRAK" << endl;
        return;
    }
    cout << ans << endl;
}
signed main()
{
#ifdef NOI_IO
    freopen(".in", "r", stdin);
    freopen(".out", "w", stdout);
#endif
    ios::sync_with_stdio(0);
    cin.tie(nullptr), cout.tie(nullptr);
#ifdef MULTI_CASES
    cin >> T;
    while (T--)
#endif
        Solve();
    return 0;
}
```
# P6005 [USACO20JAN] Time is Mooney G
## Description
有 $N$ 个城市，之间通过 $M$ 条单向道路来连接，每次到达城市 $i$ 可以获得 $m_i$。每次移动消耗一天，且移动 $T$ 天需要花费 $C\times T^2$。

从城市 $1$ 出发，最后回到城市 $1$，要求求出可以获得的最大值。
## Solution
考虑dp做法。我们设 $f_{i,j}$ 表示在出差的第 $i$ 天，当前所在城市编号是 $j$ 时的最大贡献。那么最后的答案就是所有的 $f_{i,1}$ 的最大值。

考虑状态转移，显然，对于当前城市 $j$，可以从符合存在 $k\rightarrow j$ 的城市 $k$ 转移。所以建图的时候可以建反向边来帮助转移。

那么转移方程就是：

$$f_{i,j}=\max(f_{i-1,k}+m_j,f_{i,j})$$

其中 $k$ 满足存在 $k\rightarrow j$ 的边。

### 细节
- 初始化时，$f_0,1=0$。所有的节点都要初始化为 $-1$，表示在第 $i$ 天时不可能在城市 $j$。
- $i$ 的最大值可以直接设为 $1000$，因为在最极限的情况下，$i=1000$ 也会使得 $\max(m_i)\times i-i^2\times C\le 0$。

## Code
```cpp
#include <bits/stdc++.h>
using namespace std;
// #define MULTI_CASES
#define ll long long
#define int ll
#define endl '\n'
#define vi vector<int>
#define PII pair<int, int>
const int MaxN = 2300;
const int INF = 1e9;
const int mod = 1e9 + 7;
int T = 1, N, M, C;
int a[MaxN];
vi G1[MaxN * 2];
int dp[MaxN][MaxN];
inline void Solve()
{
    cin >> N >> M >> C;
    for (int i = 1; i <= N; i++)
    {
        cin >> a[i];
    }
    for (int i = 1; i <= M; i++)
    {
        int x, y;
        cin >> x >> y;
        G1[y].push_back(x);
    }
    memset(dp, -1, sizeof dp);
    dp[0][1] = 0;
    int ans = 0;
    for (int i = 1; i <= 1000; i++)
    {
        for (int j = 1; j <= N; j++)
        {
            for (auto y : G1[j])
            {
                if (dp[i - 1][y] != -1)
                {
                    // cerr<<i-1<<" "<<y<<" "<<dp[i-1][y]<<endl;
                    dp[i][j] = max(dp[i - 1][y] + a[j], dp[i][j]);
                }
            }
            // cerr << i << " " << j << " " << dp[i][j] << endl;
        }
        ans = max(ans, dp[i][1] - C * i * i);
    }

    cout << ans << endl;
}
signed main()
{
#ifdef NOI_IO
    freopen(".in", "r", stdin);
    freopen(".out", "w", stdout);
#endif
    ios::sync_with_stdio(0);
    cin.tie(nullptr), cout.tie(nullptr);
#ifdef MULTI_CASES
    cin >> T;
    while (T--)
#endif
        Solve();
    return 0;
}
```