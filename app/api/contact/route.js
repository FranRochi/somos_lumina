import nodemailer from "nodemailer";

export async function POST(request) {
  try {
    const data = await request.json();
    const { nombre, email, telefono, mensaje } = data;

    if (!nombre || !email || !telefono || !mensaje) {
      return Response.json(
        { success: false, error: "Faltan campos obligatorios" },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: "c2661686.ferozo.com",
      port: 465,
      secure: true,
      auth: {
        user: "lumina@somoslumina.com.ar",
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Consulta Lúmina Web" <lumina@somoslumina.com.ar>`,
      to: "lumina@somoslumina.com.ar",
      subject: "Consulta desde formulario de contacto web",
      text: `
Nombre completo: ${nombre}
Correo electrónico: ${email}
Teléfono de contacto: ${telefono}

Contanos tu idea:
${mensaje}
      `,
    });

    return Response.json({
      success: true,
      message: "Mensaje enviado correctamente",
    });
  } catch (error) {
    console.error("Error al enviar el correo:", error);
    return Response.json(
      {
        success: false,
        message: "No se pudo enviar el correo. Intentá de nuevo más tarde.",
      },
      { status: 500 }
    );
  }
}
