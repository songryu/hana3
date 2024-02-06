import sys
from collections import deque
input=sys.stdin.readline
n,k=map(int,input().split()) #5,4
q=deque()
for i in range(1,n+1):
    q.append(i)
while q:
    if k<=len(q): #4<=5
        q.append(q.popleft()) #q=[23451]
        for i in range(k-1): #4-1=3, 012
            q.popleft() #234->q=[5,1]
    else:
        a=q.popleft()#5가 첫번째 청설모, a=5
        print(a)
        break






