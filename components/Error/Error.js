import { Icon } from "../Message/Message";
import styles from "../Message/Message.module.scss";

export default function Error() {
  return (
    <div className={styles.Error}>
      <div className={styles.ErrorIcon}>
        <Icon type="bot" />
        <span></span>
      </div>
      <div className={styles.ErrorMsg}>
        Something went wrong. If this issue persists please contact us through
        our help center
      </div>
    </div>
  );
}
