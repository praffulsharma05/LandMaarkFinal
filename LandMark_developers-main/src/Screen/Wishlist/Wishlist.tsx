import React, { useEffect, useState, useCallback, memo } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { fetchProperties, CityProperty } from "../../services/services";
import WishlistCard from "../../Components/Wishlist/WishlistCard";
import WishlistHeader from "../../Components/Wishlist/WishlistHeader";
import { Heart } from "lucide-react";
import { useTranslation } from "../../hooks/useTranslation";
import "./Wishlist.css";

interface UiState { loading: boolean; error: string | null; }
interface InteractionState { selectedIds: number[]; hoveredId: number | null; }

interface WishlistCardItemProps {
  property: CityProperty; selected: boolean; hovered: boolean;
  onHover: (id: number) => void; onLeave: () => void; onSelect: (id: number) => void;
  onRemove: (id: number) => void; onClick: (id: number) => void;
}

const WishlistCardItem = memo<WishlistCardItemProps>(({ property, selected, hovered, onHover, onLeave, onSelect, onRemove, onClick }) => {
  const hHover = useCallback(() => onHover(property.id), [property.id, onHover]);
  const hLeave = useCallback(() => onLeave(), [onLeave]);
  const hSelect = useCallback(() => onSelect(property.id), [property.id, onSelect]);
  const hRemove = useCallback(() => onRemove(property.id), [property.id, onRemove]);
  const hClick = useCallback(() => onClick(property.id), [property.id, onClick]);
  return <WishlistCard property={property} selected={selected} hovered={hovered} onHover={hHover} onLeave={hLeave} onSelect={hSelect} onRemove={hRemove} onClick={hClick} />;
});

const Wishlist = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [allProperties, setAllProperties] = useState<CityProperty[]>([]);
  const [wishlistIds, setWishlistIds] = useState<number[]>([]);
  const [uiState, setUiState] = useState<UiState>({ loading: true, error: null });
  const [interactionState, setInteractionState] = useState<InteractionState>({ selectedIds: [], hoveredId: null });

  useEffect(() => {
    (async () => {
      try {
        setUiState({ loading: true, error: null });
        setAllProperties(await fetchProperties() || []);
      } catch (err) {
        console.error('Error fetching properties:', err);
        setUiState(prev => ({ ...prev, error: 'Failed to load properties' }));
      } finally {
        setUiState(prev => ({ ...prev, loading: false }));
      }
    })();
  }, []);

  useEffect(() => {
    const saved = Cookies.get("wishlist");
    if (saved) setWishlistIds(JSON.parse(saved));
  }, []);

  const wishlistProperties = allProperties.filter(property => wishlistIds.includes(property.id));

  const handleSelectAll = useCallback(() => {
    setInteractionState(prev => ({
      ...prev,
      selectedIds: prev.selectedIds.length === wishlistProperties.length ? [] : wishlistProperties.map(p => p.id)
    }));
  }, [wishlistProperties]);

  const handleClearAll = useCallback(() => {
    setWishlistIds([]);
    setInteractionState(prev => ({ ...prev, selectedIds: [] }));
    Cookies.set("wishlist", JSON.stringify([]), { expires: 7 });
  }, []);

  const onReload = useCallback(() => window.location.reload(), []);
  const onBrowseProperties = useCallback(() => navigate('/properties'), [navigate]);
  const onCardHover = useCallback((id: number) => setInteractionState(prev => ({ ...prev, hoveredId: id })), []);
  const onCardLeave = useCallback(() => setInteractionState(prev => ({ ...prev, hoveredId: null })), []);
  const onCardSelect = useCallback((id: number) => {
    setInteractionState(prev => {
      const selected = prev.selectedIds;
      return { ...prev, selectedIds: selected.includes(id) ? selected.filter(s => s !== id) : [...selected, id] };
    });
  }, []);
  const onCardRemove = useCallback((id: number) => {
    setWishlistIds(prev => {
      const updated = prev.filter(w => w !== id);
      Cookies.set("wishlist", JSON.stringify(updated), { expires: 7 });
      return updated;
    });
    setInteractionState(prev => ({ ...prev, selectedIds: prev.selectedIds.filter(s => s !== id) }));
  }, []);
  const onCardClick = useCallback((id: number) => navigate(`/property/${id}`), [navigate]);

  if (uiState.loading) return (
    <div className="min-h-screen bg-amber-50/30 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto"></div>
        <p className="mt-4 text-amber-600">{t('wishlist.loadingWishlist')}</p>
      </div>
    </div>
  );

  if (uiState.error) return (
    <div className="min-h-screen bg-amber-50/30 flex items-center justify-center">
      <div className="text-center">
        <p className="text-red-600 mb-4">{uiState.error}</p>
        <button onClick={onReload} className="bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition">{t('wishlist.tryAgain')}</button>
      </div>
    </div>
  );

  return (
    <div className="wishlist-container w-full min-h-screen bg-amber-50/30 text-black overflow-hidden">
      <WishlistHeader total={wishlistProperties.length} selectedCount={interactionState.selectedIds.length} onSelectAll={handleSelectAll} onClear={handleClearAll} />
      {wishlistProperties.length === 0 ? (
        <div className="flex-1 flex items-center justify-center min-h-screen text-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 py-16 text-center">
            <div className="wishlist-empty-icon inline-flex items-center justify-center bg-amber-100 rounded-full mb-6">
              <Heart className="w-12 h-12 text-amber-400" />
            </div>
            <h1 className="text-2xl font-normal text-amber-800 mb-2">{t('wishlist.wishlistEmpty')}</h1>
            <p className="text-amber-600 mb-6">{t('wishlist.startAdding')}</p>
            <button onClick={onBrowseProperties} className="px-6 py-3 bg-amber-600 text-amber-800 font-semibold rounded-lg hover:bg-amber-700 transition">{t('wishlist.browseProperties')}</button>
          </div>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-4 py-8 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlistProperties.map((property) => (
              <WishlistCardItem key={property.id} property={property} selected={interactionState.selectedIds.includes(property.id)} hovered={interactionState.hoveredId === property.id} onHover={onCardHover} onLeave={onCardLeave} onSelect={onCardSelect} onRemove={onCardRemove} onClick={onCardClick} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Wishlist;
