import React from 'react'
import Markdown from './Markdown'

export const Default = () => {
  const [input, setInput] = React.useState(
    'Which of the following statements is applicable to _KlickerUZH_? Keep in mind that KlickerUZH supports a *wide variety* of **Markdown features**'
  )
  return (
    <div className="flex flex-col">
      <div>
        Enter some text below that should be fed to the Markdown plugin and
        rendered accordingly:
      </div>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="mb-5"
      />
      <div>Parsed Markdown Content:</div>
      <Markdown content={input} />
    </div>
  )
}

export const DescriptionOnly = () => {
  const [input, setInput] = React.useState(
    'Which of the following statements is applicable to _KlickerUZH_? Keep in mind that KlickerUZH supports a *wide variety* of **Markdown features**'
  )
  return (
    <div className="flex flex-col">
      <div>
        If the content is missing, but a description is provided, the
        description will be used by the Markdown component:
      </div>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="mb-5"
      />
      <div>Note that the description will bypass the pipeline:</div>
      <Markdown content={undefined} description={input} />
    </div>
  )
}

export const Math = () => {
  const [input, setInput] = React.useState(
    "$$\nT_n f(x;a) = f(a) + \\frac{f'(a)}{1!}(x - a) + \\frac{f''(a)}{2!}(x - a)^2 + ... + \\frac{f^{(n)}(a)}{n!}(x - a)^n\\\\\n T_4 sin(x;0) = x - \\frac{x^3}{6}\n$$"
  )
  return (
    <div className="flex flex-col">
      <div>
        Beside common markdown logic, inline math, etc. also multi-line math is
        supported with the correct notation:
      </div>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="mb-5"
      />
      <div>The rendered output will look like:</div>
      <Markdown content={input} />
    </div>
  )
}
