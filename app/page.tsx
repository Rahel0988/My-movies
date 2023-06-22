
import { GET, POST  } from "./comments/api/route";
import Comments from "./comments/page";
import Movies from "./movies/page";
 export default function Home() {
   return (
    <main>
      <h1>
        home page
      </h1>
      <div>
        <h2 className="font-bold text-cyan-400 px-20 font-sans text-8xl text-center"> Nice seeing you here </h2>
      </div>
    </main>
   );}