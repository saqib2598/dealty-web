import React from 'react'
import { Button, Form, Alert } from 'reactstrap'
import { Field } from 'react-final-form'
import InputAdapter from '../InputAdapter'

const SocialLinksForm = ({alert, user, ...props}) => (
  <Form onSubmit={props.handleSubmit}>
    { user.plan && user.plan.perks.filter(perk => perk.key == 'social_media').length > 0 &&
      <Field
        id="facebook"
        name="facebook"
        label="Facebook"
        placeholder="Facebook Link"
        type="text"
        component={InputAdapter}
        parse={value => (value === "" ? null : value)}
      />
    }
    { user.plan && user.plan.perks.filter(perk => perk.key == 'social_media').length > 0 &&
      <Field
        id="instagram"
        name="instagram"
        label="Instagram"
        placeholder="Instagram Link"
        type="text"
        component={InputAdapter}
        parse={value => (value === "" ? null : value)}
      />
    }
    { user.plan && user.plan.perks.filter(perk => perk.key == 'web_link').length > 0 &&
      <Field
        id="website"
        name="website"
        label="Website"
        placeholder="Website Link"
        type="text"
        component={InputAdapter}
        parse={value => (value === "" ? null : value)}
      />
    }
    {props.submitFailed &&
    <div className="text-danger">{props.submitError}</div>
    }
    <div className="clearfix">
      <Button
        block
        size="lg"
        color="secondary"
        disabled={(props.submitting)}
        type="submit"
      >{props.submitting ? 'Saving...' : 'Save'}</Button>
    </div>
    {alert && <Alert color="success" className="text-center mt-4">{alert}</Alert>}
    <style jsx>{`
      .clearfix{
        padding-top: 15px;
      }
      h3{
        margin: 0 auto 0px auto;
        text-align: center;
      }
      p{
        text-align: center;
      }
    `}</style>
  </Form>
)

export default SocialLinksForm
