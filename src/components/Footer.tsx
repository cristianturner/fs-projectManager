type FooterProps = {
  total: number;
  completed: number;
  pending: number;
};

function Footer(props: FooterProps) {
  return (
    <footer>
      <p>Total tasks: {props.total}</p>
      <p>Completed tasks: {props.completed}</p>
      <p>Pending tasks: {props.pending}</p>
    </footer>
  );
}

export default Footer;