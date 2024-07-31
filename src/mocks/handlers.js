import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("http://localhost:3000/community", () => {
    return HttpResponse.json([
      {
        id: "2f1b6bf3-f23c-47e4-88f2-e4ce89409376",
        firstName: "Marjy",
        lastName: "Smith",
        position: "Lead Designer at Company Name",
      },
    ]);
  }),
  http.post("http://localhost:3000/subscribe", async ({ request }) => {
    try {
      const body = await request.json(); // Obtén el cuerpo de la solicitud como JSON
      const email = body.email;
      console.log("email:", email);
      if (email === "forbidden@email.com") {
        return  HttpResponse.json({
          error: "Email is already in use",
        });
      }
      return HttpResponse.json({ success: true });
    } catch (error) {
      console.error("Failed to parse request body:", error);
      return HttpResponse.json({
        error: "Invalid request body",
      });
    }
  }),
  http.post("http://localhost:3000/unsubscribe", () => {
    return HttpResponse.json({ success: true });
  }),
];
