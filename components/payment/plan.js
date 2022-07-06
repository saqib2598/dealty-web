import React from 'react'
import { Link } from '../../routes'

const Plan = (props) => {
  const { plan, activePlanId, stripeCustomer, confirmSubscription, unsubscribe, user } = props
  const active = plan.id == activePlanId
  const { cancelAt, card } = user

  function subUnsubButton() {
    return(
      <button type="submit"
        disabled={!plan.active}
        className={`btn ${active && card && !cancelAt ? 'btn-danger' : 'btn-info'} btn-block`}
        onClick={active && card  && !cancelAt ? unsubscribe : () => confirmSubscription(plan)} >
        { active && card ? cancelAt ? 'ReSubscribe' : 'UnSubscribe' : 'Subscribe' }
      </button>
    )
  }

  function trialButton() {
    return(
      <button type="submit"
        disabled={!plan.active}
        className={'btn btn-info btn-block'}
        onClick={() => confirmSubscription(plan)} >
        {plan.nickname == "REO/Bank Owned" ? "Contact Us" : "Start free 30 days trial" }
      </button>
    )
  }

  return(
      <div className="plan">
        <p className="plan_icons"><img alt="Home Builders" src={plan.icon} width="100" height="100" /></p>
        {plan.nickname == "REO/Bank Owned" ?
          <p><span className="price">contact@yourdealty.com</span></p>
          :
          <p><span className="price">${plan.displayPrice}</span> /mo</p>
        }
        <p className="header">{plan.nickname}</p>
        {plan.nickname == "REO/Bank Owned" ?
          <Link route="/contact">
            <button type="submit"
              className={'btn btn-info btn-block'} >
              Contact Us
            </button>
          </Link>
          :
          stripeCustomer ?
            card ?
              subUnsubButton()
              :
              <Link route={`/payment/${plan.id}`}>
                {subUnsubButton()}
              </Link>
            :
            <button type="submit"
              disabled={!plan.active}
              className={'btn btn-info btn-block'}
              onClick={() => confirmSubscription(plan)} >
              Start free 30 days trial
            </button>
        }
        {plan.perks.map((perk) =>(
          <p key={perk.key}>{perk.label}</p>
        ))}
        <style jsx>{`
            @import "styled-jsx-helper";
            .plan_icons{
              margin-top: 10px;
            }
      `}</style>
      </div>
  );
}
export default Plan
