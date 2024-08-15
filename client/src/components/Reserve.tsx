const Reserve = ({
  openModal,
  hotelId,
}: {
  openModal: boolean;
  hotelId: number;
}) => {
  return (
    <>
      {openModal && <div className="w-screen h-screen bg-[#00000059] absolute flex justify-center items-center">
        
        <div className="w-[500px] h-[400px] bg-white">
          <div className="flex justify-end gap-4">
            <button onClick={() => openModal(false)}>X</button>
          </div>
          <h2 className="text-center text-3xl">
            Réservez votre chambre pour {hotelId}
          </h2>

          {/* form */}
        </div>
      </div>}
    </>
  );
};

export default Reserve;
