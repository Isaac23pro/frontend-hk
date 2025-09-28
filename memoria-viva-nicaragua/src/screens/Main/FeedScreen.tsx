import React, { useEffect, useState, useCallback, useRef } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { getFeedMemories } from '../../services/api';
import { Memory } from '../../types';
import MemoryCard from '../../components/common/MemoryCard';
import { useAuth } from '../../contexts/AuthContext'; // Import useAuth

const FeedContainer = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
`;

const LoadingMessage = styled.p`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xl};
  color: ${({ theme }) => theme.colors.text};
`;

const FloatingActionButton = styled.button`
  position: fixed;
  bottom: 80px;
  right: 20px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.white};
  font-size: 36px;
  line-height: 55px;
  text-align: center;
  border: none;
  box-shadow: ${({ theme }) => theme.shadows.medium};
  cursor: pointer;
  transition: transform 0.2s;
  z-index: 100;

  &:hover {
    transform: scale(1.05);
  }
`;

const FeedScreen = () => {
  const [memories, setMemories] = useState<Memory[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef<IntersectionObserver>();
  const navigate = useNavigate();
  const { user } = useAuth(); // Get user from context

  const lastMemoryElementRef = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prevPage => prevPage + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, [loading, hasMore]);

  useEffect(() => {
    if (!hasMore) return;
    setLoading(true);
    const fetchMemories = async () => {
      try {
        const { memories: newMemories, hasMore: newHasMore } = await getFeedMemories(page);
        setMemories(prev => [...prev, ...newMemories]);
        setHasMore(newHasMore);
      } catch (error) {
        console.error("Failed to fetch memories:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMemories();
  }, [page, hasMore]);

  if (page === 1 && loading && memories.length === 0) {
    return <LoadingMessage>Cargando memorias...</LoadingMessage>;
  }

  const canCreateContent = user?.role === 'Comunidad' || user?.role === 'Docente';

  return (
    <FeedContainer>
      {memories.map((memory, index) => {
        if (memories.length === index + 1) {
          return <div ref={lastMemoryElementRef} key={memory.id}><MemoryCard memory={memory} /></div>;
        } else {
          return <MemoryCard key={memory.id} memory={memory} />;
        }
      })}
      {loading && <LoadingMessage>Cargando más...</LoadingMessage>}
      {!hasMore && <LoadingMessage>No hay más memorias para mostrar.</LoadingMessage>}

      {/* --- Conditional Rendering for Content Creators --- */}
      {canCreateContent && (
        <FloatingActionButton onClick={() => navigate('/crear-memoria')}>
          +
        </FloatingActionButton>
      )}
    </FeedContainer>
  );
};

export default FeedScreen;