---
title: Codeforces Round 1064 (Div. 2）题解
date: "2025-11-18"
description: Codeforces Round 1064 (Div. 2) A-E题解。
  - 题解
  - CF
tags: ['题解', 'Codeforces']
draft: false
---
# A. Same Difference
## Description

给定一个长度为 $n$ 的字符串 $s$，由小写字母组成。

在一次操作中，你可以选择一个整数 $i$，满足 $1 \leq i<n$，并将 $s_i$ 改为 $s_{i+1}$。

使所有字符相同所需的最少操作次数是多少？可以证明这是始终可行的。
## Solution
显然，$s_n$ 是不可被修改的，所以只能修改前面的 $n-1$ 个数，使得其全部与 $s_n$ 相同。所以只需要对每个不等于 $s_n$ 的字符做一次操作。

时间复杂度：$O(n)$。
## Code
```cpp
#include <bits/stdc++.h>
using namespace std;
#define MULTI_CASES
#define ll long long
#define int ll
#define endl '\n'
#define vi vector<int>
#define PII pair<int, int>
const int MaxN = 2e5 + 100;
const int INF = 1e9;
const int mod = 1e9 + 7;
int T = 1, N, M;
int a[MaxN];
inline void Solve()
{
    string s;
    cin>>N;
    cin>>s;
    char ss=s[s.size()-1];
    int sum=0;
    for(int i=0;i<s.size()-1;i++){
        if(s[i]==ss){
            continue;
        }
        sum++;
    }
    cout<<sum<<endl;
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

# B. Tab Closing
## Description

你已盯着电脑屏幕太久，是时候休息一下，去触摸一下草地了。

你的屏幕长度为 $a$，上面显示着 $n$ 个标签页。你希望通过点击它们右端的“x”来关闭所有标签页。

每个标签页是一个长度为 $\textrm{len}=\min(b,\frac{a} {m})$ 的线段，其中 $m$ 表示剩余标签页的数量。标签页总是紧密地从左端点开始顺序排列；也就是说，标签页的“x”位置分别在距离左端点 $\textrm{len}, 2 \cdot \textrm{len}, 3 \cdot \textrm{len}, \ldots, m \cdot \textrm{len}$ 的位置。请注意，随着你关闭标签页，它们的长度会发生变化。

现在你的光标位于屏幕的左端点。你想知道，关闭所有标签页，最少需要移动鼠标的次数“**次**”。

如果你对题意理解有困难，可以参考浏览器标签页的可视化示意，或点击[这里](https://codeforces.com/assets/contests/2166/B_ohLashaeLa4aizeiceij.html)。
## Solution

观察样例，发现所有的答案都是 $1$ 或 $2$。

手动模拟一下这一过程，可以发现，如果 $\frac{a}{m}<b$，也就是当标签页铺满整个屏幕的情况下，只需要移动到屏幕的最右侧，一直点击清除即可。

反之，如果 $\frac{a}{m}\geq b$，也就是每个标签页可以完全展开到长度 $b$ 的情况下，只需要在第一个标签页的位置一直点击清除即可。

总操作次数 $ans\le 2$。

## Code
```cpp
#include <bits/stdc++.h>
using namespace std;
#define MULTI_CASES
#define ll long long
#define int ll
#define endl '\n'
#define vi vector<int>
#define PII pair<int, int>
const int MaxN = 2e5 + 100;
const int INF = 1e9;
const int mod = 1e9 + 7;
int T = 1, N, M;
// int a[MaxN];
int a,b;
inline void Solve()
{
    cin>>a>>b>>N;
    int m=a/b;
    if(N>m&&a!=b){
        cout<<2<<endl;
    }
    else{
        cout<<1<<endl;
    }
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

# C. Cyclic Merging
## Description

你被赋予了 $n$ 个非负整数 $a_1,a_2,\ldots,a_n$，它们在一个环上排列。对于每个 $1 \le i < n$，$a_i$ 和 $a_{i+1}$ 是相邻的；$a_1$ 和 $a_n$ 也是相邻的。

你需要恰好执行以下操作 $n-1$ 次：

- 选择环上任意一对相邻的元素，设它们的值为 $x$ 和 $y$，并将它们合并为一个值为 $\max(x,y)$ 的元素，合并的代价也是 $\max(x,y)$。

请注意，该操作会使环的大小减一，并相应更新相邻关系。

请计算将环合并为一个元素的最小总成本。
## Solution

考虑贪心，每次操作优先删除代价最小的。同时，每个数与其左侧的数合并等价于其左侧的数与这个数合并。所以只需要统计一个数向右合并的代价并从小到大排序，然后取其前 $n-1$ 个即可。

## Code
```cpp
#include <bits/stdc++.h>
using namespace std;
#define MULTI_CASES
#define ll long long
#define int ll
#define endl '\n'
#define vi vector<int>
#define PII pair<int, int>
const int MaxN = 2e5 + 100;
const int INF = 1e9;
const int mod = 1e9 + 7;
int T = 1, N, M;
int a[MaxN];
int b[MaxN];
inline void Solve()
{
    cin>>N;
    for(int i=1;i<=N;i++){
        cin>>a[i];
    }
    for(int i=1;i<=N;i++){
        int j=i+1;
        if(j==N+1)j=1;
        b[i]=max(a[i],a[j]);
    }
    sort(b+1,b+N+1);
    int ans=0;
    for(int i=1;i<N;i++){
        ans+=b[i];
    }
    cout<<ans<<endl;
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
// 1 1 4 5 1 4 1
// 1 4 5 5 4 4 1
// 1 1 3 2
// 1 3 3 2
```
# D. Marble Council
## Description
你得到一个多重集 $a$，它由 $n$ 个整数 $a_1,a_2,\ldots,a_n$ 组成。你希望通过以下步骤生成一个新的多重集 $s$：

- 将 $a$ 分割成任意数量的非空多重集 $x_1,x_2,\ldots,x_k$，每个元素恰好属于其中一个多重集。
- 最初，$s$ 为空。对每个 $x_i$，从其**众数**$^{\text{∗}}$ 中选择**一个**并将其插入 $s$。

请计算通过该过程能生成的不同多重集 $s$ 的个数，结果对 $998\,244\,353$ 取模。

请注意，统计的是不同**多重集**的数量，这意味着元素的顺序不重要，但每个元素的个数很重要，即 $\{1,1,2\}$、$\{1,2\}$、$\{1,1,2,2\}$ 都被视为不同的。

$^{\text{∗}}$ 多重集的众数定义为出现次数最多的元素；若多个元素并列为最大值，则它们都被视为众数。
## Solution

首先，题目给定的 $a$ 是一个多重集合，也就是无序的。所以答案只与每个元素出现的频率 $c_i$ 有关。

考虑多重集合 $S$，如果 $a_i$ 在 $S$ 中出现了 $t_i$ 次，也就意味着划分出的子序列中，有 $t_i$ 个序列的众数是 $a_i$。那么 $S$ 可以表示为 $S=\{i|a_i^{t_i}\}$。

之后考虑如何判定 $S$ 合法，可以得出结论：
$$
\sum_{i\in S}c_i\geq \max_{j\notin S}c_j
$$
考虑 $i\in S$ 的部分，如果 $i\in S$，也就意味着 $a_i$ 至少是一个子序列的 **众数**。那么根据众数的定义，在这一子序列中，$a_i$ 出现的次数必须大于等于其他数出现的次数。那么我们将这些数先填入子序列。

之后考虑 $j\notin S$ 的部分，如果 $j\notin S$，也就意味着 $a_j$ 在每个子序列都不被作为众数。那么为了将这部分填入子序列，一定需要满足子序列中一定存在一个 $a_i$ 出现次数大于等于 $a_j$。

所以问题就转化为：求出所有合法的子序列的乘积和，一个子序列合法当且仅当元素之和不小于 $\max{c_i}$。

之后通过背包DP求解即可。设 $f_{i,j}$ 表示前 $i$ 个元素，已选择的元素之和为 $j$ 时的答案。
$$
f_{i,j}=f_{i-1,j}+f_{i-1,j-c_i}\cdot c_i
$$
复杂度 $O(n^2)$。
## Code
```cpp
#include <bits/stdc++.h>
using namespace std;
#define MULTI_CASES
#define ll long long
#define int ll
#define endl '\n'
#define vi vector<int>
#define PII pair<int, int>
const int MaxN = 5100;
const int INF = 1e9;
const int mod = 998244353;
int T = 1, N, M;
int a[MaxN];
int sum[MaxN];
int dp[MaxN][MaxN];
inline void Solve()
{
    cin >> N;
    memset(sum, 0, sizeof sum);
    int maxn = 0;
    for (int i = 1; i <= N; i++)
    {
        cin >> a[i];
        sum[a[i]]++;
        maxn = max(maxn, sum[a[i]]);
    }
    dp[0][0] = 1;
    for (int i = 1; i <= N; i++)
    {
        for (int j = 0; j <= N; j++)
        {
            if (j < sum[i])
            {
                dp[i][j] = dp[i - 1][j];
            }
            else
            {
                dp[i][j] = (dp[i - 1][j] + dp[i - 1][j - sum[i]] * sum[i]) % mod;
            }
        }
    }
    int ans = 0;
    for (int i = maxn; i <= N; i++)
    {
        (ans += dp[N][i]) %= mod;
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