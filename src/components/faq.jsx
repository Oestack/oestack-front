import { useEffect, useRef, useState } from 'react'
import { ChevronDown } from 'lucide-react'

function Faq({
  questions = [],
  id = 'preguntas-frecuentes',
  showWhenEmpty = false,
  animateOnView = false,
}) {
  const [openItem, setOpenItem] = useState(null)
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!animateOnView || !section) return undefined

    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting)
    }, { threshold: 0.15 })

    observer.observe(section)
    return () => observer.disconnect()
  }, [animateOnView])

  if (questions.length === 0 && !showWhenEmpty) return null

  const toggleItem = (questionId) => {
    setOpenItem((prev) => (prev === questionId ? null : questionId))
  }

  return (
    <section
      ref={sectionRef}
      className={`faq-section${isVisible ? ' projects-section--visible' : ''}`}
      id={id}
      aria-labelledby={`${id}-title`}
    >
      <div className="faq-section-title-area">
        <h2 className="faq-title" id={`${id}-title`}>Resolvé tus dudas</h2>
        <p className="faq-subtitle">
          <span className="faq-subtitle-lead">Lo que necesitás saber</span>
          <span className="faq-subtitle-accent">antes de iniciar tu proyecto digital.</span>
        </p>
      </div>

      {questions.length > 0 && (
        <div className="faq-section-body">
          <div className="faq-accordion-container">
            {questions.slice(0, 5).map((item, index) => {
              const questionId = item.id ?? index
              const isOpenItem = openItem === questionId
              const itemIndex = String(index + 1).padStart(2, '0')

              return (
                <div
                  key={questionId}
                  className={`faq-item${isOpenItem ? ' is-open' : ''}`}
                >
                  <button
                    type="button"
                    className="faq-question-btn"
                    onClick={() => toggleItem(questionId)}
                    aria-expanded={isOpenItem}
                    aria-controls={`${id}-answer-${index}`}
                    id={`${id}-question-${index}`}
                  >
                    <span className="faq-question-left">
                      <span className="faq-question-number">{itemIndex}</span>
                      <span className="faq-question-text">{item.question}</span>
                    </span>
                    <span className="faq-question-right">
                      <span className="faq-chevron-wrap">
                        <ChevronDown className="faq-chevron" size={18} aria-hidden="true" />
                      </span>
                    </span>
                  </button>

                  <div
                    id={`${id}-answer-${index}`}
                    role="region"
                    aria-labelledby={`${id}-question-${index}`}
                    className={`faq-answer-collapse${isOpenItem ? ' is-expanded' : ''}`}
                  >
                    <div className="faq-answer-content">
                      {item.description}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </section>
  )
}

export default Faq
