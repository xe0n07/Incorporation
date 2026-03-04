import { useState } from 'react'
import StepOne from './components/StepOne'
import StepTwo from './components/StepTwo'

function App() {
  const [currentStep, setCurrentStep] = useState(() =>
    localStorage.getItem('draft_company') ? 2 : 1
  )
  const [companyData, setCompanyData] = useState(() => {
    const saved = localStorage.getItem('draft_company')
    return saved ? JSON.parse(saved) : null
  })

  const handleStepOneComplete = (company) => {
    localStorage.setItem('draft_company', JSON.stringify(company))
    setCompanyData(company)
    setCurrentStep(2)
  }

  const handleStepTwoComplete = () => {
    localStorage.removeItem('draft_company')
    setCurrentStep(3)
  }

  return (
    <div className="grid-bg min-h-screen py-12 px-4">
      {/* Header */}
      <div className="text-center mb-10">
        <span style={{
          fontWeight: 800, fontSize: '22px', color: '#0f2233', letterSpacing: '-0.5px'
        }}>
          Incorporation
        </span>
        <p style={{ color: '#6b8a9a', fontSize: '13px', marginTop: '4px' }}>
          Incorporation Made Simple
        </p>
      </div>

      <div className="card fade-up" style={{ maxWidth: '540px', margin: '0 auto' }}>
        {/* Step progress */}
        {currentStep < 3 && (
          <div className="step-wrap">
            <div className={`step-circle ${currentStep > 1 ? 'done' : 'active'}`}>
              {currentStep > 1 ? '✓' : '1'}
            </div>
            <div className={`step-line ${currentStep > 1 ? 'done' : 'idle'}`} />
            <div className={`step-circle ${currentStep === 2 ? 'active' : 'idle'}`}>2</div>
          </div>
        )}

        {/* Step labels */}
        {currentStep < 3 && (
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '-12px', marginBottom: '24px' }}>
            <span className="step-label" style={{ color: '#1a3a4a' }}>Company Info</span>
            <span className="step-label" style={{ color: currentStep === 2 ? '#1a3a4a' : '#a0b0bf' }}>Shareholders</span>
          </div>
        )}

        {currentStep === 1 && <StepOne onComplete={handleStepOneComplete} />}
        {currentStep === 2 && companyData && (
          <StepTwo company={companyData} onComplete={handleStepTwoComplete} />
        )}
        {currentStep === 3 && (
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <div className="pop-in" style={{ fontSize: '56px', marginBottom: '16px' }}>🎉</div>
            <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#0f2233', marginBottom: '8px' }}>
              Company Incorporated!
            </h2>
            <p style={{ color: '#6b8a9a', fontSize: '14px', marginBottom: '28px' }}>
              Your company has been successfully registered.
            </p>
            <button
              onClick={() => { setCurrentStep(1); setCompanyData(null) }}
              className="btn btn-primary"
              style={{ marginBottom: '12px' }}
            >
              Start New Incorporation
            </button>
            <a href="/admin" style={{
              display: 'block', textAlign: 'center', marginTop: '12px',
              fontSize: '13px', color: '#1a5276', textDecoration: 'none', fontWeight: 500
            }}>
              View Admin Panel →
            </a>
          </div>
        )}
      </div>

      {/* Footer link */}
      <p style={{ textAlign: 'center', marginTop: '24px', fontSize: '12px', color: '#8aa0b0' }}>
        <a href="/admin" style={{ color: '#8aa0b0' }}>Admin Panel</a>
      </p>
    </div>
  )
}

export default App