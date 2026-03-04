import { useState } from 'react'
import axios from 'axios'

function StepOne({ onComplete }) {
  const [formData, setFormData] = useState({ name: '', number_of_shareholders: '', total_capital: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!formData.name.trim()) return setError('Company name is required')
    if (Number(formData.number_of_shareholders) < 1) return setError('At least 1 shareholder required')
    if (Number(formData.total_capital) <= 0) return setError('Capital must be a positive number')

    try {
      setLoading(true)
      const res = await axios.post('http://localhost:5000/companies', {
        name: formData.name,
        number_of_shareholders: Number(formData.number_of_shareholders),
        total_capital: Number(formData.total_capital)
      })
      onComplete(res.data)
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fade-up">
      <h2 style={{ fontSize: '17px', fontWeight: 700, color: '#0f2233', marginBottom: '6px' }}>
        Company Information
      </h2>
      <p style={{ fontSize: '13px', color: '#6b8a9a', marginBottom: '24px' }}>
        Fill in your company's basic details to get started.
      </p>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
        <div>
          <label className="form-label">Company Name</label>
          <input className="input" type="text" name="name"
            value={formData.name} onChange={handleChange} placeholder="e.g. Acme Pvt. Ltd." />
        </div>
        <div>
          <label className="form-label">Number of Shareholders</label>
          <input className="input" type="number" name="number_of_shareholders"
            value={formData.number_of_shareholders} onChange={handleChange} min="1" placeholder="e.g. 3" />
        </div>
        <div>
          <label className="form-label">Total Capital Invested (USD)</label>
          <input className="input" type="number" name="total_capital"
            value={formData.total_capital} onChange={handleChange} min="0" step="0.01" placeholder="e.g. 100000" />
        </div>

        {error && <p className="error-msg">{error}</p>}

        <button type="submit" disabled={loading} className="btn btn-primary" style={{ marginTop: '4px' }}>
          {loading ? <><span className="spinner" /> Saving draft...</> : 'Save & Continue →'}
        </button>
      </form>
    </div>
  )
}

export default StepOne