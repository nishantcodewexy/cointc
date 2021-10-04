import React from 'react'
import pt from 'prop-types'
import { connect } from 'react-redux'

export const ActionButton = (props) => {
    return (
        <div>
            
        </div>
    )
}

ActionButton.propTypes = {
    props: pt.shape({
        action:pt.func.isRequired,
        actionTitle:pt.string
    })
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(ActionButton)
