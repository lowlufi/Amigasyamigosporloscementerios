// Cloudflare Function for authentication
export async function onRequestPost(context) {
  const { request, env } = context;

  // CORS headers
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  try {
    const body = await request.json();
    const { username, password, action = 'login' } = body;

    if (action === 'login') {
      // Basic validation
      if (!username || !password) {
        return new Response(JSON.stringify({
          success: false,
          error: 'Usuario y contraseña son requeridos'
        }), {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
            ...corsHeaders
          }
        });
      }

      // Demo credentials (in production, use proper authentication)
      const validCredentials = [
        { username: 'admin', password: 'cementerios2024', role: 'admin', name: 'Administrador' },
        { username: 'editor', password: 'patrimonio2024', role: 'editor', name: 'Editor' },
        { username: 'eduardo', password: 'vergara2024', role: 'author', name: 'Eduardo Vergara' }
      ];

      const user = validCredentials.find(
        cred => cred.username === username && cred.password === password
      );

      if (!user) {
        return new Response(JSON.stringify({
          success: false,
          error: 'Credenciales incorrectas'
        }), {
          status: 401,
          headers: {
            'Content-Type': 'application/json',
            ...corsHeaders
          }
        });
      }

      // Generate a simple token (in production, use JWT)
      const token = btoa(JSON.stringify({
        username: user.username,
        role: user.role,
        name: user.name,
        exp: Date.now() + (24 * 60 * 60 * 1000) // 24 hours
      }));

      return new Response(JSON.stringify({
        success: true,
        token,
        user: {
          username: user.username,
          role: user.role,
          name: user.name
        }
      }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders
        }
      });
    }

    return new Response(JSON.stringify({
      success: false,
      error: 'Acción no válida'
    }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders
      }
    });

  } catch (error) {
    console.error('Auth error:', error);

    return new Response(JSON.stringify({
      success: false,
      error: 'Error interno del servidor'
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders
      }
    });
  }
}

// Handle OPTIONS request for CORS
export async function onRequestOptions(context) {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    }
  });
}