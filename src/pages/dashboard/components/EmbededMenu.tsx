const EmbededMenu = ({ name }: { name: string }) => {
  return (
    <div style={{ transform: `scale(0.7)` }}>
      <iframe
        src={import.meta.env.VITE_FRONTEND_URL + "/m/" + name}
        width={400}
        height={500}
        title="my Menu"
      />
    </div>
  );
};

export default EmbededMenu;
