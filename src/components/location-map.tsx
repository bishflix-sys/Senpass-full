
"use client";

import 'leaflet/dist/leaflet.css';
import * as React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from './ui/skeleton';
import { Alert, AlertTitle, AlertDescription } from './ui/alert';
import { MapPin, Loader2, LocateFixed } from 'lucide-react';

// Fix for default Leaflet icon not showing up in Next.js
// You might need to copy these images to your public folder
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


// Sample nearby locations
const nearbyLocations = [
    { id: 1, name: 'CBAO Agence Centrale', type: 'bank', position: [14.673, -17.442] as [number, number] },
    { id: 2, name: 'BNDE Siège Social', type: 'bank', position: [14.675, -17.445] as [number, number] },
    { id: 3, name: 'SONATEL Agence', type: 'company', position: [14.676, -17.440] as [number, number] },
    { id: 4, name: 'Boutique Orange', type: 'company', position: [14.670, -17.448] as [number, number] },
    { id: 5, name: 'SENELEC Agence', type: 'agency', position: [14.678, -17.443] as [number, number] },
    { id: 6, name: 'Ecobank Point-E', type: 'bank', position: [14.694, -17.476] as [number, number] },
];


export default function LocationMap() {
    const { toast } = useToast();
    const [userPosition, setUserPosition] = React.useState<[number, number] | null>(null);
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setUserPosition([position.coords.latitude, position.coords.longitude]);
                    setIsLoading(false);
                },
                (error) => {
                    console.error("Geolocation error:", error);
                    // Fallback to a default location (Dakar)
                    setUserPosition([14.6937, -17.44406]);
                    setIsLoading(false);
                    toast({
                        variant: 'destructive',
                        title: "Erreur de géolocalisation",
                        description: "Impossible d'obtenir votre position. Affichage d'une carte par défaut.",
                    });
                }
            );
        } else {
             // Fallback for browsers that don't support geolocation
            setUserPosition([14.6937, -17.44406]);
            setIsLoading(false);
            toast({
                variant: 'destructive',
                title: "Géolocalisation non supportée",
                description: "Votre navigateur ne supporte pas la géolocalisation.",
            });
        }
    }, [toast]);

    if (isLoading) {
        return (
             <div className="space-y-2">
                <div className="flex items-center gap-2 text-muted-foreground">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Chargement de la carte...</span>
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
        <MapContainer center={userPosition} zoom={14} scrollWheelZoom={false} style={{ height: '400px', width: '100%', borderRadius: 'var(--radius)' }}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {/* Marker for user's position */}
            <Marker position={userPosition}>
                <Popup>Vous êtes ici.</Popup>
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
    );
}

