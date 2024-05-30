import { Typography } from "antd";

function AppFooter() {
  return (
    <div className="AppFooter">
      <Typography.Link href="tel:+123456789">+123456789</Typography.Link>
      <Typography.Link href="https://google.com">
        Privacy Policy
      </Typography.Link>
      <Typography.Link href="https://google.com">Terms of Use</Typography.Link>
    </div>
  );
}

export default AppFooter;
