import styled from "styled-components";
import axios from "axios";
import { useState, useRef, useEffect } from "react";
import { API_URL, timeAgo } from "../App";
import profile from "/profile.png";

const Rfsb = styled.div`
  width: 100%;
  height: 100%;
  background-color: black;
  color: white;
  overflow-y: auto;
  position: fixed;
  right: 0;
  border-left: 2px solid #404040;
  padding: 1rem;
  display: none;

  @media (min-width: 640px) {
    display: block;
    width: 28rem;
  }
`;

const SectionBox = styled.div`
  border: 2px solid #525252;
  border-radius: 1rem;
  padding: 1rem;
  background-color: black;
  width: 100%;
  overflow: hidden;
  margin-top: 1rem;
`;

const SectionItem = styled.div`
  padding: 0.75rem;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: grid;
  gap: 1rem;

  &:hover {
    background-color: #2b2d2f;
  }
`;

const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 0.75rem;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  grid-column: span 3 / span 3;
`;

const ProfileImage = styled.div`
  width: 3rem;
  height: 3rem;
  border-radius: 9999px;
  background-color: #4b5563;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const UserName = styled.div`
  grid-column: span 6 / span 6;
  display: flex;
  align-items: center;
  font-weight: 600;
  color: white;
`;

const PostTime = styled.div`
  grid-column: span 3 / span 3;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  font-size: 0.875rem;
  color: #9ca3af;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const ShowMore = styled.div`
  color: #3b82f6;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  margin-top: 0.5rem;

  &:hover {
    text-decoration: underline;
  }
`;

const LeaderboardWrapper = styled.div`
  border-top: 2px solid #404040;
  padding-top: 1rem;
  background-color: black;
  margin-top: 1.5rem;
`;

const TopThreeWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

const TopCard = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #374151;
  padding: 0.75rem;
  border-radius: 0.5rem;
`;

const ParticipantImage = styled.div`
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 9999px;
  background-color: #4b5563;
  overflow: hidden;
`;

const RankBox = styled.div`
  background-color: #facc15;
  color: black;
  font-weight: 700;
  font-size: 1.125rem;
  width: 1.5rem;
  height: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  margin-top: -1.25rem;
`;

const LeaderboardList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const LeaderboardRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #374151;
  padding: 0.75rem;
  border-radius: 0.5rem;
`;

const ParticipantDetails = styled.div`
  flex: 1;
  margin-left: 0.75rem;
`;

const ParticipantRank = styled.div`
  color: #3b82f6;
  font-weight: 700;
`;

const topThree = [
  {
    name: "Yash Desai",
    points: "314,109",
    rank: 1,
    image: "https://via.placeholder.com/100?text=Y1",
  },
  {
    name: "Yash Parte",
    points: "283,954",
    rank: 2,
    image: "https://via.placeholder.com/100?text=Y2",
  },
  {
    name: "Sidharth Acharya",
    points: "233,342",
    rank: 3,
    image: "https://via.placeholder.com/100?text=Y3",
  },
];

const leaderboardData = [
  {
    name: "Nabil Akhtar",
    caption: "Symbiosis Institute",
    rank: 4,
    image: "https://via.placeholder.com/50?text=N",
  },
  {
    name: "Akash Patel",
    caption: "Shailesh J. Mehta School",
    rank: 5,
    image: "https://via.placeholder.com/50?text=A",
  },
  {
    name: "Marc Fernandes",
    caption: "IIT Bombay",
    rank: 6,
    image: "https://via.placeholder.com/50?text=M",
  },
];

export default function Rightsidebar() {
  const [loading, setLoading] = useState(false);
  const [trendingPosts, setTrendingPosts] = useState([]);
  const [error, setError] = useState(null);

  async function fetchData() {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`${API_URL}/v1/trending`);
      const data = response.data;
      if (data.success) {
        setTrendingPosts(data.message);
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
      setError(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Rfsb>
      <div className="space-y-6">
        <input
          type="text"
          placeholder="Search"
          className="text-lg bg-[#2b2d2f] placeholder-gray-500 rounded-full p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <SectionBox>
          <p className="text-white text-2xl font-bold">What's happening</p>
          {trendingPosts.map((post, index) => (
            <SectionItem key={index}>
              <GridWrapper>
                <UserInfo>
                  <ProfileImage>
                    <img
                      src={profile}
                      alt="User"
                      className="w-full h-full object-cover rounded-full"
                    />
                  </ProfileImage>
                </UserInfo>
                <UserName>{post.userId}</UserName>
                <PostTime>{timeAgo(post.createdAt)}</PostTime>
              </GridWrapper>
              <Content>
                <p className="text-gray-400 mt-2 line-clamp-2">
                  {post.caption}
                </p>
              </Content>
            </SectionItem>
          ))}
          <ShowMore>Show more</ShowMore>
        </SectionBox>

        <LeaderboardWrapper>
          <p className="text-white text-2xl font-bold mb-4">Leaderboard</p>
          <TopThreeWrapper>
            {topThree.map((participant, index) => (
              <TopCard key={index}>
                <ParticipantImage>
                  <img
                    src={participant.image}
                    alt={participant.name}
                    className="w-full h-full object-cover"
                  />
                </ParticipantImage>
                <RankBox>{participant.rank}</RankBox>
                <div className="text-blue-300 font-bold mt-2">
                  {participant.name}
                </div>
                <div className="text-sm text-gray-500">
                  {participant.points} Pts
                </div>
              </TopCard>
            ))}
          </TopThreeWrapper>
          <LeaderboardList>
            {leaderboardData.map((participant, index) => (
              <LeaderboardRow key={index}>
                <ParticipantImage>
                  <img
                    src={participant.image}
                    alt={participant.name}
                    className="w-full h-full object-cover"
                  />
                </ParticipantImage>
                <ParticipantDetails>
                  <div className="text-blue-300 font-bold">
                    {participant.name}
                  </div>
                  <div className="text-gray-500 text-sm">
                    {participant.caption}
                  </div>
                </ParticipantDetails>
                <ParticipantRank>#{participant.rank}</ParticipantRank>
              </LeaderboardRow>
            ))}
          </LeaderboardList>
        </LeaderboardWrapper>
      </div>
    </Rfsb>
  );
}
