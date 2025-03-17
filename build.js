const esbuild = require('esbuild');

const args = process.argv.slice(2); // Capture command-line arguments
const isWatch = args.includes('--watch'); // Check if `--watch` is passed

async function build() {
    const context = await esbuild.context({
        entryPoints: ['./src/main.js'], // Main file importing all others
        bundle: true,
        outfile: './dist/index.js', // Output file
        minify: true, // Optional: Minify for production
        sourcemap: true, // Optional: Generate sourcemaps
        format: 'iife', // Immediately Invoked Function Expression for better scoping
        target: ['es2015'], // Target modern browsers
    });

    if (isWatch) {
        console.log("Watching for changes...");
        await context.watch();
    } else {
        console.log("Building...");
        await context.rebuild(); // Build once
        console.log("Build succeeded.");
        await context.dispose();
    }
}

build().catch((error) => {
    console.error("Build failed:", error);
});