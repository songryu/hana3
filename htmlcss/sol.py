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

dis=diks(j)

# if min(dis)==INF:
#     print(-1)
#     exit()
adist=bdist=INF
for i in range(1,n+1):
    if i in ahouse :
        if adist > dis[i]:
            adist = dis[i]
    elif i in bhouse :
        if bdist > dis[i]:
            bdist = dis[i]

if adist == INF and bdist == INF :
    print(-1)
else :
    if adist <= bdist :
        print('A')
        print(adist)
    else :
        print('B')
        print(bdist)