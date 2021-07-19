import Button from "../Button/Button";
import { CardT } from "../../types/types";
import "./Card.scss";

export default function Card([id, items]: [string, any]) {
  const href = `https://setting-myshopkit.netlify.app/?campaign=${items.campaignId}&accessToken=${items.accessToken}&shopName=${items.shopName}`;
  return `
    <div class="card grid">
      <div class="card__status">
        Status
      </div>
      <div class="card__content">

      </div>
      <div class="card__actions">
        <a class="support" href="${href}" data-width="${items.width}" data-heigh="${items.height}">New support</a>
      </div>
    </div>
  `;
}
