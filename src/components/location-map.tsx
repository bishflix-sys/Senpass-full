"use client";

import 'leaflet/dist/leaflet.css';
import * as React from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from './ui/skeleton';
import { Alert, AlertTitle, AlertDescription } from './ui/alert';
import { LocateFixed, Loader2 } from 'lucide-react';
import { Button } from './ui/button';

// Fix for default Leaflet icon not showing up in Next.js
const iconUrl = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png";
const iconRetinaUrl = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png";
const shadowUrl = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png";

const DefaultIcon = L.icon({
    iconUrl,
    iconRetinaUrl,
    shadowUrl,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

// Custom user location icon
const userIcon = new L.Icon({
    iconUrl: 'data:image/svg+xml;base64,' + btoa('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/></svg>'),
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, -12],
});

// Sample nearby locations
const nearbyLocations = [
    { id: 1, name: 'CBAO Agence Centrale', type: 'bank', position: [14.673, -17.442] as [number, number] },
    { id: 2, name: 'BNDE Siège Social', type: 'bank', position: [14.675, -17.445] as [number, number] },
    { id: 3, name: 'SONATEL Agence', type: 'company', position: [14.676, -17.440] as [number, number] },
    { id: 4, name: 'Boutique Orange', type: 'company', position: [14.670, -17.448] as [number, number] },
    { id: 5, name: 'SENELEC Agence', type: 'agency', position: [14.678, -17.443] as [number, number] },
    { id: 6, name: 'Ecobank Point-E', type: 'bank', position: [14.694, -17.476] as [number, number] },
];


interface MapViewProps {
    userPosition: [number, number];
}

const MapView: React.FC<MapViewProps> = ({ userPosition }) => {
    const mapRef = React.useRef<L.Map | null>(null);
    const { toast } = useToast();

    const centerOnUser = () => {
        if(userPosition && mapRef.current) {
            mapRef.current.setView(userPosition, 16);
            toast({ title: "Position centrée", description: "La carte a été centrée sur votre position actuelle." });
        }
    }

    return (
        <div className="relative">
            <MapContainer
                center={userPosition}
                zoom={15}
                scrollWheelZoom={true}
                style={{ height: '400px', width: '100%', borderRadius: 'var(--radius)' }}
                ref={mapRef}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                
                {/* Marker for user's position */}
                <Marker position={userPosition} icon={userIcon}>
                    <Popup>Vous êtes ici (position approximative).</Popup>
                </Marker>
                
                {/* Markers for nearby locations */}
                {nearbyLocations.map(loc => (
                     <Marker key={loc.id} position={loc.position}>
                        <Popup>
                            <b>{loc.name}</b><br/>
                            Type: {loc.type}
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
            <Button
                variant="default"
                size="icon"
                onClick={centerOnUser}
                className="absolute bottom-4 right-4 z-[400] shadow-lg"
                aria-label="Center on my location"
                title="Centrer sur ma position"
            >
                <LocateFixed className="h-5 w-5" />
            </Button>
        </div>
    )
}

export default function LocationMap() {
    const { toast } = useToast();
    const [userPosition, setUserPosition] = React.useState<[number, number] | null>(null);
    const [error, setError] = React.useState<string | null>(null);
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        if (!navigator.geolocation) {
            setError("La géolocalisation n'est pas supportée par votre navigateur.");
            setIsLoading(false);
            toast({
                variant: 'destructive',
                title: "Géolocalisation non supportée",
                description: "Votre navigateur ne supporte pas la géolocalisation.",
            });
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                setUserPosition([position.coords.latitude, position.coords.longitude]);
                setIsLoading(false);
            },
            (err) => {
                console.error("Geolocation error:", err.message);
                setError("Impossible d'obtenir votre position. Affichage d'une carte par défaut.");
                // Fallback to a default position if geolocation fails
                setUserPosition([14.6937, -17.44406]); 
                setIsLoading(false);
                toast({
                    variant: 'destructive',
                    title: "Erreur de géolocalisation",
                    description: "Veuillez autoriser l'accès à votre position.",
                });
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0
            }
        );
    }, [toast]);

    if (isLoading) {
        return (
             <div className="space-y-2">
                <div className="flex items-center gap-2 text-muted-foreground">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Recherche de votre position...</span>
                </div>
                <Skeleton className="h-[400px] w-full rounded-lg" />
             </div>
        );
    }
    
    if (error && !userPosition) {
        return (
            <Alert variant="destructive">
                <LocateFixed className="h-4 w-4" />
                <AlertTitle>Carte non disponible</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
            </Alert>
        );
    }

    if (userPosition) {
         return <MapView userPosition={userPosition} />;
    }

    // This case should ideally not be reached if logic is correct
    return null; 
}
