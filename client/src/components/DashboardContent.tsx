const DashboardContent = ({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  return (
    <section className={`w-full xl:w-5/6  relative overflow-y-scroll ${className}`}>{children}</section>
  );
};

export default DashboardContent;
