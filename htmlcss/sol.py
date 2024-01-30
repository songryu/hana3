import sys
import heapq
input=sys.stdin.readline

n,m=map(int,input().split())
j=int(input())
k=int(input())
INF=int(1e9)
distance=[INF]*(n+1)
ahouse=list(map(int,input().split()))
bhouse=list(map(int,input().split()))
            
graph=[[] for _ in range(n+1)]

for _ in range(m):
    x,y,z=map(int,input().split())
    graph[x].append((z,y))
    graph[y].append((z,x))

def diks(start):
    q=[]
    print(distance)
    heapq.heappush(q,(0,start)) #cost
    distance[start]=0
    while q:
        dist,node=heapq.heappop(q)
        if distance[node]<dist:
                continue
        for cost,n in graph[node]:
             costed=dist+cost
             if costed<distance[n]:
                  distance[n]=costed
                  heapq.heappush(q,(costed,n))
    return distance

dis=diks(2)
print(dis)
# for i in range(1,n+1):
#     dis=diks(i)
#     print(dis[2])