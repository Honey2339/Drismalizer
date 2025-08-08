    <p align="center">
        <img src="public/drismaBanner.png" alt="">
    </p>

    ---

    A visual schema explorer and diagram generator for [Drizzle ORM](https://orm.drizzle.team). Drismalizer helps you **instantly visualize your schema** using an interactive drag-and-drop canvas, making schema design and debugging easier than ever.

    ![cover](https://github.com/Honey2339/Drismalizer/blob/main/public/example.png?raw=true)

    ## Tech Stack

    - **Next.js**
    - **TypeScript**
    - **React Flow** for the diagram
    - **ts-morph** for schema parsing
    - **Tailwind CSS** for styling

    ## Contributing

    Got ideas? Found a bug? Wanna add new features?  
    Pull requests and issues are always welcome.

    To get started here is what you have to do :

   1️⃣ ```bash
    git clone https://github.com/Honey2339/Drismalizer.git
    cd drismalizer
    pnpm install

    ```
    2️⃣ Set up environment variables
    This project requires a .env file in the root directory.

    Copy the example environment file:
```bash
    cp example.env .env
```

    Make sure your .env file looks like this 

    ```bash
    NEXT_PUBLIC_CANVAS_URL=http://localhost:3000/canvas
    ```
3️⃣ Run the development server
 ``` bash
    pnpm dev
 ```

    Then head over to `http://localhost:3000`.

    ## Contact

    Made with 💚 by [Honey](https://github.com/Honey2339)

    Landing page design inspired by [Legion.dev](https://legions.dev/)

    Project idea inspired by [Prismalizer](https://prismaliser.app/)
