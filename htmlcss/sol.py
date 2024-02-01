import sys
input=sys.stdin.readline
#위상정렬 (순환하지 않는 방향 그래프
# 큐에서 노드 1을 꺼낸 뒤에 노드 1에서 나가는 간선을 제거함 
t=int(input())

for _ in range(t):
    T=int(input())
    final=[]
    listed=list(map(int,input().split()))
    ll=len(listed)
    dp=[i for i in range(1,T+1)]
    try:
        for i in range(ll-1,-1,-1):
            print(listed[i],dp[listed[i]])
            dp.pop(listed[i])
            final.append(dp[listed[i]])
            #9 ->dp 숫자중 그 숫자보다 작은게 9개 있음 , 
            #1~9까지가 뒤에 있고 나머지 숫자 dp[9]
        print("final",final)
    except IndexError:
        print("IMPOSSIBLE")
            

