/** @jsx jsx */
import {jsx} from '@emotion/core'

import React from 'react'
import {
  FaCheckCircle,
  FaPlusCircle,
  FaMinusCircle,
  FaBook,
} from 'react-icons/fa'
import {FaTimesCircle} from 'react-icons/fa'
import Tooltip from '@reach/tooltip'
import * as colors from '../styles/colors'
// 🐨 you'll need useUser from '../context/user-context'
// 🐨 you will need the following methods from ../context/list-item-context:
//   useListItemDispatch, useSingleListItemState, removeListItem,
//   updateListItem, and addListItem
import useCallbackStatus from '../utils/use-callback-status'
import {CircleButton, Spinner} from './lib'

function TooltipButton({label, highlight, onClick, icon, ...rest}) {
  const {isPending, isRejected, error, run} = useCallbackStatus()

  function handleClick() {
    run(onClick())
  }

  return (
    <Tooltip label={isRejected ? error.message : label}>
      <CircleButton
        css={{':hover,:focus': {color: isPending ? colors.gray80 : highlight}}}
        disabled={isPending}
        onClick={handleClick}
        {...rest}
      >
        {isPending ? <Spinner /> : isRejected ? <FaTimesCircle /> : icon}
      </CircleButton>
    </Tooltip>
  )
}

function StatusButtons({book}) {
  // 🐨 get the user from useUser
  // 🐨 get `dispatch` from useListItemDispatch
  // 🐨 get this from useSingleListItemState
  const listItem = null

  // 🦉 for each of these, make sure to return the call to the utility
  // it's important for the `useCallbackStatus` hook in TooltipButton so it
  // shows a spinner/error message properly.
  function handleRemoveClick() {
    // 🐨 return a call to removeListItem
  }

  function handleMarkAsReadClick() {
    // 💰 here, I'll give you this one so you get an idea of what we need to do.
    // return updateListItem(dispatch, listItem.id, {finishDate: Date.now()})
  }

  function handleAddClick() {
    // 🐨 return a call to addListItem
  }

  function handleMarkAsUnreadClick() {
    // 🐨 return a call to updateListItem
  }

  return (
    <React.Fragment>
      {listItem ? (
        Boolean(listItem.finishDate) ? (
          <TooltipButton
            label="Unmark as read"
            highlight={colors.yellow}
            onClick={handleMarkAsUnreadClick}
            icon={<FaBook />}
          />
        ) : (
          <TooltipButton
            label="Mark as read"
            highlight={colors.green}
            onClick={handleMarkAsReadClick}
            icon={<FaCheckCircle />}
          />
        )
      ) : null}
      {listItem ? (
        <TooltipButton
          label="Remove from list"
          highlight={colors.danger}
          onClick={handleRemoveClick}
          icon={<FaMinusCircle />}
        />
      ) : (
        <TooltipButton
          label="Add to list"
          highlight={colors.indigo}
          onClick={handleAddClick}
          icon={<FaPlusCircle />}
        />
      )}
    </React.Fragment>
  )
}

export default StatusButtons