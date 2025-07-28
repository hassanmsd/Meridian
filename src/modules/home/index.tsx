const Home = () => {
  return (
    <div className="h-full bg-background flex items-center justify-center">
      <div className="text-center space-y-6 px-4">
        <h1 className="text-4xl md:text-6xl font-bold text-foreground">
          Welcome to Insight Board
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          You can use the navigation bar at the top to move around
        </p>
      </div>
    </div>
  );
};

export default Home;
