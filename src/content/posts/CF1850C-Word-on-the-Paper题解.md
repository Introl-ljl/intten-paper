---
title: CF1850C Word on the Paper题解
date: "2023-08-03"
description: 题目简述 在 $8 \times 8$ 的点网格上，一个由小写拉丁字母组成的单词从上到下垂直地写在一列中。你需要找到他并输出 题目分析 由题意可得，网格中只会有一个单词，所以只需要自上而下遍历网格，如果是字母就输出即可。 Code #include &lt;bits/stdc++.h&gt; using namespace std; #define ll long long #define int...
tags: ['题解', 'Codeforces']
draft: false
---
### 题目简述

在 $8 \times 8$ 的点网格上，一个由小写拉丁字母组成的单词从上到下垂直地写在一列中。你需要找到他并输出

### 题目分析

由题意可得，网格中只会有一个单词，所以只需要自上而下遍历网格，如果是字母就输出即可。

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
   string a[10];\\避免爆空间可以开大点
   for (int i = 0; i < 8;i++){
        cin >> a[i];
   }
   for (int i = 0; i < 8;i++){
        for (int j = 0; j < a[i].size();j++){
            if(a[i][j]!='.'){
                cout << a[i][j];
            }
        }
   }
   cout << endl;
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