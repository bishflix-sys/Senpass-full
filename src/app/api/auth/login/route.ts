import {NextResponse} from 'next/server';
import {z} from 'zod';

// Schéma de validation pour les données de connexion
const loginSchema = z.object({
  email: z.string().email({message: 'Adresse e-mail invalide'}),
  password: z.string().min(1, {message: 'Le mot de passe est requis'}),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validation = loginSchema.safeParse(body);

    // Si la validation échoue, renvoyer une erreur 400
    if (!validation.success) {
      return NextResponse.json(
        {error: validation.error.errors[0].message},
        {status: 400}
      );
    }

    const {email, password} = validation.data;

    // --- Logique d'authentification (Simulation) ---
    // Dans une application réelle, vous vérifieriez ces informations
    // par rapport à une base de données.
    // Exemple : const user = await db.user.findUnique({ where: { email } });
    //          if (!user || !await compare(password, user.password)) ...

    const DEMO_USER_EMAIL = 'abdoulaye.sene@email.sn';
    const DEMO_USER_PASSWORD = 'password123';

    if (email === DEMO_USER_EMAIL && password === DEMO_USER_PASSWORD) {
      // Authentification réussie
      // Dans la prochaine étape, nous créerons et enverrons un jeton de session ici.
      return NextResponse.json(
        {success: true, message: 'Connexion réussie'},
        {status: 200}
      );
    } else {
      // Authentification échouée
      return NextResponse.json(
        {error: 'Les informations de connexion sont incorrectes'},
        {status: 401}
      );
    }
  } catch (error) {
    console.error('[LOGIN_API_ERROR]', error);
    return NextResponse.json(
      {error: 'Une erreur interne est survenue'},
      {status: 500}
    );
  }
}