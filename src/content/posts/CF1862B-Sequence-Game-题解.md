---
title: CF1862B Sequence Game 题解
date: "2023-08-25"
description: 分析 很简单的一道构造题。 因为第一个数是必取的，所以只需要从第二个数开始判断，即如果 ​b_{i-1}\le b_i，就不需要在这两个数之间添加别的数。 反之，如果不满足，我们就需要在这两个数之间添加一个 ​b_i，这样就可以保证它满足 ​b_{i-1}\le b_i 的条件。 所以我们只需要先跑一次循环计算出 ​m 的值，将 ​m 和 ​a_1 提前输出，然后循环输出剩下的数即可。 Code ...
tags: ['题解', 'Codeforces']
draft: false
---
### 分析

很简单的一道构造题。

因为第一个数是必取的，所以只需要从第二个数开始判断，即如果 $b_{i-1}\le b_i$，就不需要在这两个数之间添加别的数。

反之，如果不满足，我们就需要在这两个数之间添加一个 $b_i$，这样就可以保证它满足 $b_{i-1}\le b_i$ 的条件。

所以我们只需要先跑一次循环计算出 $m$ 的值，将 $m$ 和 $a_1$ 提前输出，然后循环输出剩下的数即可。

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
    int a[2000010];
    for(int i=1;i<=n;i++){
        cin>>a[i];
    }
    int m=1;
    //cout<<a[1]<<" ";
    for(int i=2;i<=n;i++){
        m++;
        if(a[i]>=a[i-1]){//如果不满足条件长度就需要加一
            //m++;
            continue;
        }  
        m++;
    }
    cout<<m<<endl<<a[1]<<" ";//a1直接输出即可，循环从2开始
    for(int i=2;i<=n;i++){
        if(a[i]>=a[i-1]){
            cout<<a[i]<<" ";
        }
        else{
            cout<<a[i]<<" "<<a[i]<<" ";
        }
    }
    cout<<endl;
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