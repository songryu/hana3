import sys
import heapq
input=sys.stdin.readline
n=int(input())
for _ in range(n):
    numvote=list(map(int,input().split()))
stack =[]
start = 1
for i in range(n):
    if start==numvote[i]:
        numvote.pop()
    else:
        stack.append(numvote[i])

if stack==[]:
    print("Nice")
else:
    print("Sad")

    