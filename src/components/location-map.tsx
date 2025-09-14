
"use client";

import 'leaflet/dist/leaflet.css';
import * as React from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from './ui/skeleton';
import { Alert, AlertTitle, AlertDescription } from './ui/alert';
import { MapPin, Loader2, LocateFixed } from 'lucide-react';
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

// Component to handle map view updates
const ChangeView = ({ center, zoom }: { center: [number, number]; zoom: number }) => {
    const map = useMap();
    map.setView(center, zoom);
    return null;
}

export default function LocationMap() {
    const { toast } = useToast();
    const [userPosition, setUserPosition] = React.useState<[number, number] | null>(null);
    const [isLoading, setIsLoading] = React.useState(true);
    const mapRef = React.useRef<L.Map>(null);

    React.useEffect(() => {
        let watchId: number;

        if (navigator.geolocation) {
            watchId = navigator.geolocation.watchPosition(
                (position) => {
                    const newPos: [number, number] = [position.coords.latitude, position.coords.longitude];
                    setUserPosition(newPos);
                    if (isLoading) setIsLoading(false);
                },
                (error) => {
                    console.error("Geolocation error:", error);
                    if(userPosition === null) { // Only set default and toast if no position was ever set
                        setUserPosition([14.6937, -17.44406]); // Fallback to Dakar
                        toast({
                            variant: 'destructive',
                            title: "Erreur de géolocalisation",
                            description: "Impossible d'obtenir votre position. Affichage d'une carte par défaut.",
                        });
                    }
                    setIsLoading(false);
                },
                {
                    enableHighAccuracy: true,
                    timeout: 10000,
                    maximumAge: 0
                }
            );
        } else {
            setUserPosition([14.6937, -17.44406]);
            setIsLoading(false);
            toast({
                variant: 'destructive',
                title: "Géolocalisation non supportée",
                description: "Votre navigateur ne supporte pas la géolocalisation.",
            });
        }

        return () => {
            if (watchId) {
                navigator.geolocation.clearWatch(watchId);
            }
        };
    }, [toast, isLoading, userPosition]);

    const centerOnUser = () => {
        if(userPosition && mapRef.current) {
            mapRef.current.setView(userPosition, 16);
            toast({ title: "Position centrée", description: "La carte a été centrée sur votre position actuelle." });
        }
    }


    if (isLoading) {
        return (
             <div className="space-y-2">
                <div className="flex items-center gap-2 text-muted-foreground">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Recherche de votre position...</span>
                </div>
                <Skeleton className="h-[400px] w-full" />
             </div>
        );
    }
    
    if (!userPosition) {
        return (
            <Alert variant="destructive">
                <LocateFixed className="h-4 w-4" />
                <AlertTitle>Carte non disponible</AlertTitle>
                <AlertDescription>
                    La carte n'a pas pu être chargée. Veuillez vérifier vos permissions de localisation.
                </AlertDescription>
            </Alert>
        );
    }

    return (
        <div className="relative">
            <MapContainer
                center={userPosition}
                zoom={15}
                scrollWheelZoom={true}
                style={{ height: '400px', width: '100%', borderRadius: 'var(--radius)' }}
                whenCreated={map => { if(mapRef) (mapRef as React.MutableRefObject<L.Map>).current = map }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                
                {/* Marker for user's position */}
                <Marker position={userPosition} icon={userIcon}>
                    <Popup>Vous êtes ici (position en temps réel).</Popup>
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
    );
}
