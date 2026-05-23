import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

interface UsePropertyCardsParams {
  onToggleLikeCallback?: (id: number, nextLikedState: boolean) => void;
}

export const usePropertyCards = ({ onToggleLikeCallback }: UsePropertyCardsParams = {}) => {
  const navigate = useNavigate();
  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set());
  const [likedProperties, setLikedProperties] = useState<Set<number>>(new Set());

  const onCardClick = useCallback((e: React.MouseEvent) => {
    const id = Number((e.currentTarget as HTMLElement).dataset.propertyId);
    if (id) navigate(`/property/${id}`);
  }, [navigate]);

  const onImageError = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    const id = Number((e.currentTarget as HTMLElement).dataset.propertyId);
    if (id) {
      setImageErrors(prev => {
        const ns = new Set(prev);
        ns.add(id);
        return ns;
      });
    }
  }, []);

  const onToggleLike = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    const id = Number((e.currentTarget as HTMLElement).dataset.propertyId);
    if (id) {
      setLikedProperties((prev) => {
        const ns = new Set(prev);
        const nextState = !ns.has(id);
        if (ns.has(id)) {
          ns.delete(id);
        } else {
          ns.add(id);
        }
        onToggleLikeCallback?.(id, nextState);
        return ns;
      });
    }
  }, [onToggleLikeCallback]);

  return {
    imageErrors,
    likedProperties,
    onCardClick,
    onImageError,
    onToggleLike
  };
};
