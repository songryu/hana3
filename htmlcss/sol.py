import sys
from collections import deque
input=sys.stdin.readline
#위상정렬 (순환하지 않는 방향 그래프
# 큐에서 노드 1을 꺼낸 뒤에 노드 1에서 나가는 간선을 제거함 


n,m=map(int,input().split())
#각 노드에 연결된 간선 정보 연결리스트 
degree=[[] for _ in range(n+1)]
#모든 노드에 대한 진입차수 0으로 초기화
num=[0 for _ in range(n+1)]

for _ in range(m):
    a,b=map(int,input().split())
    degree[a].append(b)
    num[b]+=1#진입차수 1증가
print(degree)
#1 3
#2 3

#위상정렬함수
def toplogy():
    result=[]
    q=deque()
    #처음 시작할때는 진입차수가 0 인 노드를 큐에 삽입
    for i in range(1,n+1):
        if num[i]==0:
            q.append(i)
    print(q) #1,2
    #큐가 빌때까지 반복
    while q:
        now=q.popleft()
        print("now",now)
        result.append(now) #1
        for i in degree[now]: #1
            print("I",i)#3
            num[i]-=1
            if num[i]==0:
                q.append(i)
    
    print(*result)
toplogy()