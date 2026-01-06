---
title: Luogu-P5686-题解
date: "2024-10-08"
description: P5686题目解析
tags: ['题解', 'Luogu']
draft: false
---
# 题目分析
## 40pts做法
$40$ 分做法十分简单，将式子代入模拟即可，复杂度 $O(n^3)$。
## 70pts做法
我们可以观察到，$S(l,r)$ 的值可以通过前缀和预处理，从而降低时间复杂度至 $O(n^2)$。
## 100pts做法
通过例子来解释：

当 $n=3$ 时：

$$\sum_{l=1}^{n}\sum_{r=l}^{n}S(l,r)=S(1,1)+s(1,2)+S(1,3)+S(2,2)+S(2,3)+S(3,3)$$

$S(1,1) = A_1\times B_1$

$S(1,2) = A_2\times B_2$

$S(1,3) = A_3\times B_3$

$S(2,2) = (A_2 - A_1)\times (B_2-B_1)$

$S(2,3) = (A_3 - A_1)\times (B_3-B_1)$

$S(3,3) = (A_3 - A_2)\times (B_3-B_2)$

我们将其全部相加，经过化简可得最终式子:

$$\sum_{l=1}^{n}\sum_{r=l}^{n}S(l,r)=(n+1)\sum_{i=1}^{N}(A_i\times B_i)-\sum_{i=1}^{n}A_i\times\sum_{i=1}^{n}B_i$$