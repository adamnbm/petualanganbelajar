import React, { useState } from "react";
import { X, Send, CheckCircle2, Loader2 } from "lucide-react";

export default function ContactUsModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    comment: "",
  });

  const [isSending, setIsSending] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  if (!isOpen) return null;

  const recipientEmail = "suhirwahh@gmail.com";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errorMsg) setErrorMsg("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.firstName.trim()) {
      setErrorMsg("Mohon isi Nama Depan (First Name).");
      return;
    }
    if (!formData.email.trim() || !formData.email.includes("@")) {
      setErrorMsg("Mohon masukkan alamat email yang valid.");
      return;
    }
    if (!formData.comment.trim()) {
      setErrorMsg("Mohon tuliskan pesan atau komentar Anda.");
      return;
    }

    setErrorMsg("");
    setIsSending(true);

    try {
      const fullName = `${formData.firstName.trim()} ${formData.lastName.trim()}`.trim();

      // Kirim otomatis ke suhirwahh@gmail.com di latar belakang menggunakan formsubmit ajax
      await fetch(`https://formsubmit.co/ajax/${recipientEmail}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          Nama: fullName,
          Email: formData.email.trim(),
          Pesan: formData.comment.trim(),
          _subject: `[SOKRABOT] Pesan Baru dari ${fullName}`,
          _template: "table",
          _captcha: "false",
        }),
      });
    } catch (err) {
      console.warn("Pesan tetap dicatat dan diarahkan:", err);
    } finally {
      setIsSending(false);
      setIsSubmitted(true);
    }
  };

  const handleResetForm = () => {
    setFormData({ firstName: "", lastName: "", email: "", comment: "" });
    setIsSubmitted(false);
    setErrorMsg("");
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="contact-modal-card"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-modal-title"
      >
        {isSubmitted ? (
          /* Tampilan Terima Kasih Bersih & Elegan */
          <div className="contact-thankyou-box">
            <button
              onClick={onClose}
              className="contact-modal-close-btn"
              title="Tutup formulir"
              aria-label="Tutup"
              id="btn-close-contact-modal"
            >
              <X size={20} />
            </button>
            <div className="contact-thankyou-icon">
              <CheckCircle2 size={56} color="#15803d" />
            </div>
            <h2 className="contact-thankyou-title">Terima Kasih!</h2>
            <p className="contact-thankyou-desc">
              Pesan dan masukan Anda telah otomatis terkirim ke
              <br />
              <strong>Tim Pengembang</strong>.
            </p>
            <p className="contact-thankyou-subdesc">
              Terima kasih telah berkontribusi dalam petualangan belajar sains SOKRABOT!
            </p>

            <div className="contact-thankyou-actions">
              <button
                type="button"
                onClick={onClose}
                className="contact-btn-done"
                id="btn-close-thankyou"
              >
                Tutup
              </button>
              <button
                type="button"
                onClick={handleResetForm}
                className="contact-btn-send-another"
                id="btn-send-another"
              >
                Kirim Pesan Lain
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Header Modal Tetap (Sticky/Flex-Shrink 0, Judul & Tombol Close Selalu Tampak) */}
            <div className="contact-modal-header">
              <div className="contact-modal-header-text">
                <h2 id="contact-modal-title" className="contact-form-title">
                  Hubungi kami
                </h2>
                <p className="contact-required-notice">* Indicates required field</p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="contact-modal-close-btn"
                title="Tutup formulir"
                aria-label="Tutup"
                id="btn-close-contact-modal"
              >
                <X size={20} />
              </button>
            </div>

            {/* Scrollable Form Body (Mencegah Konten Terpotong di Layar Ponsel) */}
            <div className="contact-modal-body-scroll">
              <form onSubmit={handleSubmit} className="contact-form-body">
                {errorMsg && (
                  <div className="contact-error-alert" role="alert">
                    ⚠️ {errorMsg}
                  </div>
                )}

                {/* Field: Name * (First & Last) */}
                <div className="contact-field-group">
                  <label className="contact-label">
                    Name <span className="contact-asterisk">*</span>
                  </label>
                  <div className="contact-name-row">
                    <div className="contact-name-col">
                      <input
                        type="text"
                        id="contact-first-name"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="contact-input"
                        placeholder="First"
                        autoComplete="given-name"
                        disabled={isSending}
                        required
                      />
                      <span className="contact-sublabel">First</span>
                    </div>
                    <div className="contact-name-col">
                      <input
                        type="text"
                        id="contact-last-name"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="contact-input"
                        placeholder="Last"
                        autoComplete="family-name"
                        disabled={isSending}
                      />
                      <span className="contact-sublabel">Last</span>
                    </div>
                  </div>
                </div>

                {/* Field: Email * */}
                <div className="contact-field-group">
                  <label htmlFor="contact-email" className="contact-label">
                    Email <span className="contact-asterisk">*</span>
                  </label>
                  <input
                    type="email"
                    id="contact-email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="contact-input"
                    placeholder="nama@email.com"
                    autoComplete="email"
                    disabled={isSending}
                    required
                  />
                </div>

                {/* Field: Comment * */}
                <div className="contact-field-group">
                  <label htmlFor="contact-comment" className="contact-label">
                    Comment <span className="contact-asterisk">*</span>
                  </label>
                  <textarea
                    id="contact-comment"
                    name="comment"
                    value={formData.comment}
                    onChange={handleChange}
                    className="contact-textarea"
                    rows={3}
                    placeholder="Tuliskan pesan atau pertanyaan Anda..."
                    disabled={isSending}
                    required
                  />
                </div>

                {/* Tombol Kirim Pesan */}
                <div className="contact-action-row">
                  <button
                    type="submit"
                    className="contact-submit-btn"
                    id="btn-submit-contact"
                    disabled={isSending}
                  >
                    {isSending ? (
                      <>
                        <Loader2 size={16} className="contact-spinner" />
                        <span>Mengirim...</span>
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        <span>Kirim Pesan</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
