import sys
import math
input=sys.stdin.readline
t=int(input())
for _ in range(t):
    x,y=map(int,input().split())
#45+1 -> 0,1,2 46 => 48 1.2.3=>49=>50
#45=>46   3   49=>50
#012=>123=234
    abs=y-x
    start=[0,1,2]
    if abs==1:
        print(1)
    elif abs==2:
        print(2)
    elif abs<=4:
        print(3)
    else:
        n=int(math.sqrt(abs))
        summ = n * 2 - 1
        ans = abs - n*n
        if ans != 0 :
            if ans <= n :
                ans +=1
            else :
                ans +=2
        print(cnanst)
        